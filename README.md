# CCP2 - Contest Management Platform

## 📖 Description

CCP2 is a platform for managing contests, allowing users to:

- Register for contests.
- Create new contests.
- Perform random draws to select winners.
- View past contest results.

This project is built with a **frontend** and **backend** architecture to provide a seamless user experience.

---

## 🚀 Features

- **User Registration**: Participants can register for contests.
- **Contest Creation**: You can create new contests with prizes and draw dates.
- **Random Draws**: Perform random draws to select winners for contests.
- **Results Page**: View past contest results, including winners and prizes.
- **Error Handling**: Prevent duplicate registrations or draws for the same contest.

---

## 🛠️ Technologies Used

### Backend

- **Node.js**: Server-side runtime.
- **Express.js**: Web framework for building APIs.
- **SQLite**: Lightweight database for storing contest and participant data.
- **bcrypt**: For secure password hashing.
- **dotenv**: For environment variable management.

### Frontend

- **HTML/CSS/JavaScript**: For building the user interface.
- **Custom HTTP Server**: Serves static files (HTML, CSS, JS).

---

## 📂 Project Structure

```
CCP2/
├── backend/
│   ├── src/
│   │   ├── controllers/        # Handles API requests
│   │   ├── services/           # Business logic
│   │   ├── repositories/       # Database queries
│   │   ├── models/             # Data models
│   │   ├── routes/             # API routes
│   │   ├── database/           # Database init, schema, connection logic
│   │   │   ├── concours.sqlite       # SQLite database file
│   │   │   ├── init.mjs              # Script to initialize the database schema
│   │   │   └── database.js             # Function to open SQLite connection
│   ├── tests/
│   │   ├── testsControllers/   # Unit tests for controllers
│   │   ├── testsModels/        # Unit tests for models
│   │   ├── testsRepositories/  # Unit tests for repositories
│   │   └── testsServices/      # Unit tests for services
│   ├── app.js                  # Main backend entry point
│   ├── .env                    # Environment variables
├── frontend/
│   ├── public/
│   │   ├── html/               # HTML files
│   │   ├── css/                # CSS files
│   │   ├── js/                 # JavaScript files
│   ├── server.js               # Frontend HTTP server
├── package.json               # Project dependencies and scripts
├── README.md                  # Project documentation

```

---

## 🧑‍💻 Getting Started

### 1. Clone the project

```bash
git clone https://github.com/Idazgit/CCP2.git
cd CCP2
```

### 2. Install Dependencies

```bash
npm run install:all
```

### 3. Launch the servers

```bash
npm run start
```

- Frontend: Available at [http://localhost:3000](http://localhost:3000)
- Backend: Available at [http://localhost:5000](http://localhost:5000)

### 4. Run tests

```bash
cd backend
npx vitest
```

---

## 📡 API Endpoints

### Participants

- `POST /participants` - Register a new participant
- `GET /participants/:id` - Get participant details
- `POST /auth` - Login with email and password

### Giveaways

- `POST /giveaways` - Create a new contest
- `GET /giveaways` - Get all contests
- `GET /giveaways/:id` - Get contest details

### Registration

- `POST /registrations` - Register a participant to a contest
  - Body: `{ email, giveaway_id }`

### Winners

- `POST /winners/draw/:giveaway_id` - Perform a random draw for a contest
- `GET /winners/results` - Get past contest results

---

## ❗ Error Handling

- **Duplicate Draws**: Prevents performing multiple draws for the same contest.
- **Duplicate Registrations**: Prevents a participant from registering multiple times for the same contest.
- **Contest Already Drawn**: Prevents registration for contests that have already been drawn.
- **Invalid Participant**: Email not found during registration or login.
- **Invalid Giveaway ID**: Trying to register or draw on a non-existing contest.

---

## 📌 Database Design

> MCD (DrawIO) & MLD (DBDiagram) are provided as external resources.

- 4 entities: Participant, Giveaway, Registration, Winner
- Many-to-many relation between Participant & Giveaway (via Registration)
- One-to-one relation between Giveaway & Winner

📄 **MCD (DrawIO)**/📄 **MLD (DBDiagram)**: (https://www.notion.so/Project-CCP2-1ce4b42fca66806d9766dec9adab8db3)
