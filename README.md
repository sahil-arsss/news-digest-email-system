🔹 1. Client / User Layer

Who interacts:

Users subscribe using email

Choose topics (Tech, AI, Finance, Sports)

Choose frequency (Daily / Weekly)

Interaction:

Sends HTTP requests to backend APIs

Receives emails (no frontend dependency)

📌 This makes the system API-first, scalable for web/mobile later.

🔹 2. API Layer (Node.js + Express)

This is the entry point of the system.

Responsibilities:

Accept user subscriptions

Handle preference updates

Handle unsubscribe requests

Expose internal APIs for testing (scrape, summarize, send)

Example APIs:
POST  /api/users/subscribe
PATCH /api/preferences
GET   /api/unsubscribe/:token
GET   /api/articles


📌 APIs are thin — they delegate logic to services.

🔹 3. Processing Layer (Core Intelligence)

This layer does the real work.

A. Scraping Engine

Uses Axios + Cheerio

Scrapes only headlines + links

Topic-wise modular scrapers

Returns normalized article objects

📌 No DB logic inside scraper → clean separation.

B. AI Processing Engine

Runs after scraping.

Summarization Service

Takes article titles

Generates short summaries

Stores result in DB

Uses flags to avoid reprocessing

Sentiment Analysis Service

Analyzes summarized content

Classifies sentiment

Stores sentiment label

📌 AI calls are batched & cached.

🔹 4. Database Layer (MongoDB)
Collections:

Users

Articles

Key Design Decisions:

Unique index on article link (duplicate prevention)

State flags:

isSummarized

isSentimentAnalyzed

Soft unsubscribe (isSubscribed)

📌 DB acts as state machine for the pipeline.

🔹 5. Email Service Layer
Responsibilities:

Fetch articles based on user preferences

Group articles by topic

Generate HTML email

Send email using SMTP

Key Features:

Personalized per user

AI-enhanced content

Unsubscribe link embedded

📌 Email logic is decoupled from cron & APIs.

🔹 6. Scheduler Layer (Cron Jobs)

This layer automates everything.

Scheduled Tasks:

Daily scraping

Daily AI processing

Daily email delivery

Weekly email delivery

Benefits:

No manual trigger needed

Reliable execution

User frequency respected

📌 This is what makes it a real system, not a demo.

🔹 7. Logging & Monitoring (Cross-Cutting)

Across all layers:

Winston logging

Error handling middleware

Cron fault tolerance

Health check endpoint

📌 Ensures production readiness.

Summary-->

“The system is a modular backend where cron jobs automate scraping, AI processing, and personalized email delivery, using MongoDB as a state-driven pipeline controller.”
//user field
email
topics
frequency
isSubscribed
unsubscribeToken
