# 🎵 Chronotune

_Guess the Release Year of Random Songs_

![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0.0-cyan)

---

**Chronotune** is an interactive music trivia game where your knowledge of music history gets put to the test.

The challenge is simple but addictive: **listen to a short preview of a song and guess the year it was released**.

- 🎧 Think you can tell the difference between a 90s hit and a 2000s anthem?
- 🎤 Are you the type of person who instantly knows _“oh, that’s definitely early 80s!”_?
- 📀 Or maybe you’ll be surprised how often your brain tricks you.

**Chronotune** makes music discovery a game — combining Spotify’s massive library with a fun scoring system, clean UI, and plenty of replay value.

---

## 🌟 Features

### 🎧 Spotify Integration

Pulls in **real songs from Spotify’s API** so every game feels fresh. You’ll hear 30-second previews directly in the app.

### 🕹️ Interactive Gameplay

- Guess the year by typing it in **or** sliding across an interactive year range (1920–present).
- Quick feedback keeps the pace fast and exciting.

### 🏆 Scoring System

- **100 points** for a perfect guess
- Lose **2 points for each year off**
- Minimum score: 0 (sorry, no points for thinking a Beatles song came out in 2010 😉)

### 📊 Game Modes

- Choose **3, 5, or 10 songs** per session
- Track your **best scores** for each game length

### 💻 Responsive Design

Built with Next.js + Tailwind CSS, so the game feels great on both desktop and mobile.

---

## 🎮 How to Play

1. **Start a game** – Pick how many songs you want to play.
2. **Listen carefully** – Each song gives you a short preview.
3. **Make your guess** – Type or slide to the year you think is right.
4. **See your score** – Watch the points stack up.
5. **Finish strong** – At the end, view your total, compare with past runs, and challenge yourself again.

> [!WARNING]
> You will be surprised how many songs are older (or newer) than you think.

---

## ⚡ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A **Spotify Developer Account** (for API credentials)

### Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/yourusername/chronotune-next.git
   cd chronotune-next
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env.local` and add your Spotify API keys:

   ```env
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. Run locally:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) and start guessing 🎶

---

## 🙌 Credits

- [Spotify Web API](https://developer.spotify.com/documentation/web-api) – the music backbone
- [Next.js](https://nextjs.org/) – modern React framework
- [Tailwind CSS](https://tailwindcss.com/) – sleek, responsive styling
- [FontAwesome](https://fontawesome.com/) – icons

---

## 📜 License

MIT — free to use, modify, and share.
