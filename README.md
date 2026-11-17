# msatracker

msatracker is a personal hobby project of mine to solve a simple problem: keeping track of movies, TV series and anime
I want
to watch. 

What started as a solution to a personal problem also became an opportunity to explore web development,
experiment with modern technologies and turn an idea into a functional application.

## Features

- **Discover Media** – Search for movies and TV series using TMDB.
- **Watchlist** – Keep track of movies and series you want to watch.
- **Currently Watching** – Manage the media you're currently watching.
- **Completed** – Keep a record of movies and series you've finished.
- **Media Details** – Explore information about movies and series, including descriptions, ratings, release dates and
  more.
- **User Profile and Personalization** – Manage your account and Customize your experience with available display
  preferences.

## Tech Stack

**Frontend**

- React
- TypeScript
- Material UI (MUI)
- React Router
- TanStack Query
- Axios

**Backend & Services**

- Supabase – Authentication, database and user data management.
- TMDB API – Movie and TV series information.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- A Supabase project
- A TMDB API account and API access token

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd msatracker
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root and configure the required environment variables:

   ```env
   VITE_TMDB_BEARER_TOKEN=your_tmdb_bearer_token
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local development URL provided by Vite in your browser.

## Available Scripts

| Command           | Description                            |
|-------------------|----------------------------------------|
| `npm run dev`     | Starts the development server.         |
| `npm run build`   | Builds the application for production. |
| `npm run lint`    | Runs the linter.                       |
| `npm run preview` | Previews the production build locally. |

## API & Attribution

msatracker uses the [TMDB API](https://developer.themoviedb.org/) to retrieve movie and TV series information.
This product uses the TMDB API but is not endorsed or certified by TMDB.

## Disclaimer

msatracker is a media tracking and organization application. It does not host, distribute or stream movies, television
series or anime.

## License & Usage Terms

*Copyright © 2026 MSATracker. All rights reserved.*

This repository is made public for **viewing and reference purposes only**.

* **Allowed:** Viewing and reading the source code.
* **Not Allowed:** Copying, modifying, distributing, or using this code (in whole or in part) in personal, academic, or
  commercial projects without explicit written permission.

For licensing inquiries, please contact ***ng.shaden@gmail.com***.
