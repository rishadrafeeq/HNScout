HN Scout - A Simple Hacker News Reader

A clean, fast, and user-friendly Hacker News reader built with Next.js. It helps you discover the best stories effortlessly, with a focus on simplicity and smart features.

What Makes This Special

HN Scout makes browsing Hacker News easy and meaningful. Instead of just listing posts, it adds features that help you find quality content faster.

Smart Quality Scoring

Each story gets a custom Quality Score based on:

Points (40%) – How much the community likes it

Comments (30%) – How active the discussion is

Recency (30%) – How fresh the story is

Scores are shown as color-coded badges (Green = Excellent, Blue = Very Good, etc.) so you can instantly find the best stories.

Pages and Navigation
Home Page

The home page displays a paginated list of stories (20 per page).
You can browse using Next/Previous buttons or jump to a specific page.
Each card shows the story title, author, points, comments, and a quality score badge.

Clicking the card opens the detail page.

Clicking the title opens the original article link from the API.

Detail Page

The detail page shows full story details including title, author, points, time, and a link to the Hacker News discussion.
It also displays the latest 5 comments and gives an option to visit the original Hacker News page.

Why I Designed It This Way
Simple is Better

The layout is clean and minimal — easy to scan and distraction-free.

Mobile-First

The design works smoothly on phones with large touch-friendly elements and smooth scrolling.

Color Psychology

Quality badges use intuitive colors — green means great, orange means okay, gray means skip.

Fast and Reliable

Includes loading states, empty results handling, and error messages to keep the app responsive.

Technical Choices
Next.js

Used for server-side rendering so pages load quickly and content appears instantly.

TypeScript

For better code safety and structure while working with API data.

Tailwind CSS

For consistent styling and a modern, professional look.

Simple Dependencies

Lucide React – for clean icons

date-fns – for date formatting

Extra Features
Reading List

Save interesting stories in your browser to read later on the /reading-list page.

Author Profiles

View an author’s details, bio, and past posts.

Smart Error Handling

Shows friendly error messages and retry options if the API is slow or unavailable.

Quality Score Algorithm

Balances points, comments, and recency to surface engaging and relevant content.

How AI Helped

AI tools like Claude Sonnet and Cursor IDE were used to assist with layout, optimization, and testing.
All design choices, logic, and final code implementation were done manually.

The Result

HN Scout makes browsing Hacker News simpler and smarter.
With quality scores, author insights, and a clean interface, it offers a fast and enjoyable reading experience on any device.