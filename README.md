# BeyondChats – Blog Scraper & Content Enhancement System

This project is developed as part of the **BeyondChats Full Stack Developer Intern Assignment**.  
It is implemented in phases, following real-world backend, API, and automation practices.

---

## Phase 1 – Blog Scraping & REST API (Completed)

### Objective
- Scrape the latest blog articles from BeyondChats
- Store them in a MongoDB database
- Expose RESTful CRUD APIs for article management

### Tech Stack
Node.js (ES Modules), Express.js, MongoDB Atlas, Mongoose, Axios, Cheerio, dotenv

### Core Features
- Scrapes the **latest 5 blog articles** from: https://beyondchats.com/blogs/
- Extracts title, excerpt content, and source URL
- Prevents duplicate inserts using unique `sourceUrl`
- Idempotent scraper (safe to re-run)
- Clean and standard REST API design

### Article Fields
- `title`
- `content` (initial excerpt)
- `sourceUrl` (unique)
- `isUpdated`
- `createdAt`, `updatedAt`

### API Endpoints
- `GET /api/articles`
- `GET /api/articles/:id`
- `POST /api/articles`
- `PUT /api/articles/:id`
- `DELETE /api/articles/:id`

---

## Phase 2 – Automated Article Enhancement (Completed)

### Overview
Phase 2 automates the enhancement of existing blog articles using external references and an AI language model.  
This phase is implemented as a standalone automation script and uses the Phase 1 CRUD APIs to publish updates.

---

### What Has Been Implemented

#### 1. Article Fetching
- Fetches existing articles via REST API
- Skips articles already marked as updated
- Uses article title and original content as base input

#### 2. External Reference Scraping
- Uses **SerpAPI** to search Google for relevant reference articles
- Scrapes content from external sources for contextual enrichment

#### 3. AI-Based Content Enhancement
- Integrates **Google Gemini (gemini-2.5-flash)** using the official SDK
- Generates improved article content using:
  - Original article content
  - External reference content
- Ensures:
  - No verbatim copying
  - Original intent preserved
  - Improved clarity, structure, and depth

#### 4. Publishing Enhanced Articles
- Appends reference links at the bottom of the enhanced article
- Publishes the updated article using existing CRUD APIs
- Marks articles as updated to prevent reprocessing

#### 5. Automation Script
- Implemented in `automation/updateArticles.js`
- Runs independently using Node.js
- Safe to re-run (idempotent)
- Environment variables loaded securely from backend `.env`

---

## Tech Stack (Phase 2)
- Node.js (ES Modules)
- MongoDB + Mongoose
- SerpAPI (Google Search)
- Google Gemini API (`@google/generative-ai`)
- Axios, dotenv

---

## Execution Proof (Phase 2)

### Automation Script Output
![Automation Script Output](./screenshots/terminal-output.png)

### MongoDB Updated Articles
![MongoDB Atlas Updated Records](./screenshots/mongodb-atlas.png)


---

## Project Status
✅ Phase 1 – Completed  
✅ Phase 2 – Completed  

This project demonstrates end-to-end backend development, including web scraping, REST APIs, background automation, and AI-powered content enhancement.
