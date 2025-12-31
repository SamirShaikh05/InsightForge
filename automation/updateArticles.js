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

// Load backend env variables
dotenv.config({
  path: path.resolve(__dirname, "../backend/.env"),
});

// Debug logs
console.log("SERP_API_KEY:", !!process.env.SERP_API_KEY);
console.log("MONGO_URI loaded:", !!process.env.MONGO_URI);
console.log("Gemini key loaded:", !!process.env.GEMINI_API_KEY);

const API_BASE = "http://localhost:3000/api/articles";

// Fetch only non-updated articles
async function fetchArticles() {
  const res = await axios.get(API_BASE);
  return res.data.filter((article) => !article.isUpdated);
}

(async () => {
  try {
    const articles = await fetchArticles();

    if (articles.length === 0) {
      console.log("No articles to update. All articles are already enhanced.");
      return;
    }

    for (const article of articles) {
      console.log("\nProcessing article:", article.title);

      // Google search for references
      const links = await searchGoogle(article.title);

      const scrapedContents = [];

      // Scrape reference articles
      for (const link of links) {
        const content = await scrapeExternalArticle(link);
        if (content) {
          scrapedContents.push({ url: link, content });
        }
      }

      console.log(
        "Scraped external articles:",
        scrapedContents.map((x) => x.url)
      );

      const referenceTexts = scrapedContents.map((item) => item.content);

      // Build prompt for Gemini
      const prompt = buildUpdatePrompt({
        title: article.title,
        originalContent: article.content,
        referenceContents: referenceTexts,
      });

      console.log("Prompt generated for:", article.title);

      // Generate enhanced content
      const enhancedContent = await generateEnhancedContent(prompt);

      // Append references at bottom
      const referencesSection = `
      
---
### References
${scrapedContents.map((item) => `- ${item.url}`).join("\n")}
`;

      const finalContent = enhancedContent + referencesSection;

      //  Publish using Phase-1 CRUD API
      await axios.put(`${API_BASE}/${article._id}`, {
        content: finalContent,
        isUpdated: true,
      });

      console.log("Article updated successfully:", article.title);
    }
  } catch (error) {
    console.error("Automation failed:", error.message);
  }
})();
