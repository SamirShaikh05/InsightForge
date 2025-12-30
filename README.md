# BeyondChats – Blog Scraper & Content Enhancement System

This project is developed as part of the **BeyondChats Full Stack Developer Intern Assignment**.  
It is built in phases, following real-world backend and automation practices.

---

## Phase 1 – Blog Scraping & REST API (Completed)

### Objective
- Scrape blog articles from BeyondChats(Last 5)
- Store them in MongoDB Databse
- Expose RESTful CRUD APIs

### Tech Stack
Node.js (ES Modules), Express.js, MongoDB Atlas, Mongoose, Axios, Cheerio, dotenv

### Core Features
- Scrapes the **5 oldest blog articles** from: https://beyondchats.com/blogs/
- Prevents duplicate inserts using `sourceUrl` and MongoDB upsert
- Idempotent scraper (safe to re-run)
- Clean REST API design

### Article Fields
- `title`
- `content` (excerpt)
- `sourceUrl` (unique)
- `isUpdated`
- timestamps

### API Endpoints
GET /api/articles
GET /api/articles/:id
POST /api/articles
PUT /api/articles/:id
DELETE /api/articles/:id


# Phase 2 – Automated Article Enhancement (Work in Progress)

## Overview
Phase 2 focuses on automating the process of enhancing existing blog articles using external references and a Large Language Model (LLM).  
This phase is implemented as a standalone automation script and does not require running the backend server.

---

## What Has Been Implemented 

### 1. Article Fetching
- Fetches existing articles from MongoDB
- Uses article titles and content as base input for enhancement

### 2. External Reference Scraping
- Uses **SerpAPI** to search for relevant external articles based on article titles
- Extracts and stores reference URLs for contextual enrichment

### 3. AI-Based Content Enhancement
- Integrates **Google Gemini (gemini-2.5-flash)** using the official SDK
- Generates improved article content using:
  - Original article content
  - External reference context
- Ensures:
  - No verbatim copying
  - Original intent preserved
  - Improved clarity, structure, and depth

### 4. Automation Script
- Implemented in `automation/updateArticles.js`
- Can be executed independently using Node.js
- Environment variables loaded securely from backend `.env`

---

## Current Status 
- Core automation logic is **fully functional**
- Enhanced content is generated and logged successfully
- Storing enhanced content back into the database is planned as a next step

---

## Tech Stack
- Node.js (ES Modules)
- MongoDB + Mongoose
- SerpAPI (external search)
- Google Gemini API (`@google/generative-ai`)
- dotenv

---