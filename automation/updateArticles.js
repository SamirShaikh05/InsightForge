import axios from "axios";
import dotenv from "dotenv";
import { scrapeExternalArticle } from "../backend/src/services/externalScraper.js";
import { searchGoogle } from "../backend/src/services/googleSearch.js";
import { buildUpdatePrompt } from "../backend/src/services/promptBuilder.js";
import { generateEnhancedContent } from "../backend/src/services/geminiClient.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../backend/.env")
});



console.log("SERP_API_KEY:", process.env.SERP_API_KEY);
console.log("MONGO_URI loaded:", !!process.env.MONGO_URI);
console.log("Gemini key loaded:", !!process.env.GEMINI_API_KEY);
console.log("Gemini key length:", process.env.GEMINI_API_KEY?.length);




const API_BASE = "http://localhost:3000/api/articles";

async function fetchArticles() {
  const res = await axios.get(API_BASE);
  return res.data.filter(article => !article.isUpdated);
}

(async () => {
  const articles = await fetchArticles();

  for (const article of articles) {
    const links = await searchGoogle(article.title);

    const scrapedContents = [];

    for (const link of links) {
      const content = await scrapeExternalArticle(link);
      if (content) {
        scrapedContents.push({
          url: link,
          content
        });
      }
    }

    console.log("Scraped external articles for:", article.title);
    console.log(scrapedContents.map(x => x.url));

    const referenceTexts = scrapedContents.map(item => item.content);

    const prompt = buildUpdatePrompt({
      title: article.title,
      originalContent: article.content,
      referenceContents: referenceTexts
    });

    console.log("Prompt generated for:", article.title);
    console.log(prompt.slice(0, 400), "...\n");

    const enhancedContent = await generateEnhancedContent(prompt);

    console.log("Enhanced content for:", article.title);
    console.log(enhancedContent.slice(0, 400), "...\n");


  }
})();
