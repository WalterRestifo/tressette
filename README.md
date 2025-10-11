# 🃏 Tressette Online

**Tressette Online** is a web-based implementation of the classic Italian card game **Tressette**, built using Angular for the frontend and NestJS for the backend. Play 1v1 matches against real players over the internet.

---

## 📦 Tech Stack

- **Frontend:** Angular
- **Backend:** NestJS (Node.js)
- **WebSocket-based multiplayer**
- **Real-time gameplay**

---

## 🚀 Features

- ✅ Real-time 2-player online gameplay
- ✅ WebSocket communication for low-latency interaction
- ✅ Standard 40-card Italian deck
- ✅ Basic lobby system for creating or joining matches
- ✅ Enforced rules and card logic
- ✅ Responsive design (desktop & mobile browsers)

---

## 📘 Game Rules & Scoring

### 🃏 The Deck

Tressette uses a 40-card Italian deck:

Suits: Coins, Cups, Swords, Clubs

Cards per suit: Ace, 2, 3, 4, 5, 6, 7, Knave, Knight, King

No 8s, 9s, or 10s are used.

### 📊 Card Ranking (Highest to Lowest)

| Rank | Card             |
| ---- | ---------------- |
| 1️⃣   | 3                |
| 2️⃣   | 2                |
| 3️⃣   | Ace (Asso)       |
| 4️⃣   | King (Re)        |
| 5️⃣   | Knight (Cavallo) |
| 6️⃣   | Knave (Fante)    |
| 7️⃣   | 7                |
| 8️⃣   | 6                |
| 9️⃣   | 5                |
| 🔟   | 4                |

Players must follow the suit that was led. The highest card of the led suit wins the trick.

🎮 Gameplay

Each player is dealt 10 cards.

The non-dealer starts the first trick.

Players take turns playing one card per trick.

You must follow suit if possible.

The winner of each trick leads the next one.

After each trick each player takes a card from the deck. The winner of the trick takes the card as first.

After the deck is empty, the players don`t take any more cards after the tricks.

After all cards are played, the round ends and scoring begins.

### 🧮 Scoring

Only specific cards are worth points:

| Card   | Value     |
| ------ | --------- |
| Ace    | 1 point   |
| 3      | 1/3 point |
| 2      | 1/3 point |
| King   | 1/3 point |
| Knight | 1/3 point |
| Knave  | 1/3 point |
| 4–7    | 0 points  |

✅ 1 extra point is awarded to the player who wins the last trick.

📌 Total points per round: 11

👥 Authors

Walter Restifo

### 🔧 Installation

1. **Clone the repo**:

````bash
git clone https://github.com/yourusername/tressette-online.git
cd tressette-online


## Development server

To start a local development server, run:

```bash
ng serve
````

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.
