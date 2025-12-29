import axios from "axios";
import * as cheerio from "cheerio";
import Article from "../models/articleSchema.js";

const scrapeBeyondChats = async () => {
  const url = "https://beyondchats.com/blogs/page/14/";
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  // Select all blog cards
  const articles = $("article.entry-card");

  // Take last 5 oldest blogs
  const oldestFive = articles.slice(-5);

  for (let i = 0; i < oldestFive.length; i++) {
    const el = oldestFive[i];

    const title = $(el)
      .find("h2.entry-title a")
      .text()
      .trim();

    const sourceUrl = $(el)
      .find("h2.entry-title a")
      .attr("href");

    const excerpt = $(el)
      .find("div.entry-excerpt p")
      .text()
      .trim();

    const exists = await Article.findOne({ sourceUrl });
    if (exists) continue;
    
    await Article.create({
      title,
      content: excerpt,
      sourceUrl
    });

    console.log("Saved:", title);
  }
};

export default scrapeBeyondChats;
