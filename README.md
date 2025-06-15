# Project: Mood Analyser - Full-Stack Web Application

## 1. Project Overview

Mood Analyser is a full-stack web application designed to help users track their daily mood and gain insights into their emotional patterns over time. Users can log in, record a daily mood on a simple 1-5 scale, add optional notes, and view historical data through intuitive charts and visualizations. The long-term goal is to help users identify correlations and understand their mood swings better.

This project is built with a modern technology stack, featuring a React frontend and a C# ASP.NET Core backend, making it scalable and maintainable.

---

## 2. Core Features

* **Secure User Authentication:** Users can create an account and log in securely. Sessions are managed using JWTs.
* **User Profile Management:** Authenticated users have a personal profile they can manage.
* **Daily Mood Entry:** A simple interface to submit a daily mood rating (1-5) and an accompanying note. The system allows only one entry per day per user.
* **Mood History:** A historical view of all mood entries, presented in a list or calendar format.
* **Data Visualization:** An analysis dashboard with interactive charts (e.g., a line chart) displaying mood trends over various time periods (e.g., weekly, monthly).
* **Correlation Insights (Future Goal):** Future versions will include functionality to analyze and display potential correlations between moods and days of the week or other factors.

---

## 3. Technology Stack

This project uses a decoupled frontend/backend architecture.

* ### **Frontend**
    * **Framework:** **React** (with Hooks and Functional Components)
    * **Language:** **JavaScript (ES6+)**
    * **Routing:** **React Router** for client-side navigation.
    * **HTTP Client:** **Axios** for making API requests to the backend.
    * **Charting:** **Chart.js** (with react-chartjs-2) for data visualization.
    * **Styling:** **Tailwind CSS** for a utility-first styling approach.

* ### **Backend**
    * **Framework:** **ASP.NET Core Web API**
    * **Language:** **C#**
    * **Runtime:** **.NET 9** (or newer)
    * **Authentication:** **ASP.NET Core Identity** for user management and **JWT** for securing endpoints.

* ### **Database**
    * **ORM:** **Entity Framework Core (EF Core)** for data access and migrations.
    * **Development DB:** **SQLite** for its simplicity and ease of setup during local development.
    * **Production DB:** Designed for easy migration to **Azure SQL Database** or another robust relational database.

---

## 4. Getting Started

### Prerequisites

* [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
* [Node.js and npm](https://nodejs.org/)
* A code editor like [Visual Studio Code](https://code.visualstudio.com/)

### Backend Setup

1.  Navigate to the backend project directory:
    ```bash
    cd MoodAnalyser.Api
    ```
2.  Install dependencies (if not already done):
    ```bash
    dotnet restore
    ```
3.  The SQLite database should already be created. If you need to recreate it:
    ```bash
    dotnet ef database update
    ```
4.  Run the backend server (typically on `https://localhost:7001` and `http://localhost:5001`):
    ```bash
    dotnet run
    ```

### Frontend Setup

1.  Navigate to the frontend project directory:
    ```bash
    cd client-app
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the React development server (typically on `http://localhost:3000`):
    ```bash
    npm start
    ```
4.  The application should now be running in your browser, connected to the local backend API.

### Quick Start (Both Frontend and Backend)

You can use VS Code tasks to run both the frontend and backend simultaneously:

1. Open the project in VS Code
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type "Tasks: Run Task"
4. Select "Run Full Stack"

This will start both the backend API and the React frontend concurrently.

---

## 5. API Endpoints

The backend exposes the following RESTful endpoints. All endpoints requiring authentication expect a `Bearer {token}` in the Authorization header.

| Method | Endpoint                  | Description                            | Auth Required |
| :----- | :------------------------ | :------------------------------------- | :------------ |
| `POST` | `/api/auth/register`      | Registers a new user.                  | No            |
| `POST` | `/api/auth/login`         | Authenticates a user and returns a JWT.| No            |
| `GET`  | `/api/users/profile`      | Gets the current user's profile.       | Yes           |
| `POST` | `/api/moods`              | Submits a mood entry for the day.      | Yes           |
| `GET`  | `/api/moods`              | Gets a list of the user's mood entries.| Yes           |
| `GET`  | `/api/moods/analysis`     | Gets data for the analysis charts.     | Yes           |

---

## 6. Database Schema

The database is designed with two primary tables:

1.  **AspNetUsers:** (Managed by ASP.NET Core Identity) Stores user account information like `Id`, `UserName`, `PasswordHash`, etc.

2.  **MoodEntries:**
    * `Id` (Primary Key)
    * `MoodRating` (integer, 1-5)
    * `Notes` (string, nullable)
    * `EntryDate` (Date)
    * `UserId` (Foreign Key to `AspNetUsers.Id`)

This schema establishes a one-to-many relationship where one user can have many mood entries.

---

## 7. Project Structure

```
HealthTracker/
├── README.md
├── MoodAnalyser.Api/          # Backend ASP.NET Core API
│   ├── Controllers/           # API Controllers
│   ├── Data/                  # Database Context
│   ├── DTOs/                  # Data Transfer Objects
│   ├── Models/                # Entity Models
│   ├── Services/              # Business Logic Services
│   ├── Migrations/            # EF Core Migrations
│   ├── Program.cs             # Application entry point
│   └── appsettings.json       # Configuration
├── client-app/                # Frontend React Application
│   ├── public/                # Static files
│   ├── src/
│   │   ├── components/        # React Components
│   │   ├── context/           # React Context (Auth)
│   │   ├── services/          # API Service Layer
│   │   ├── App.js             # Main App Component
│   │   └── index.js           # React Entry Point
│   ├── package.json           # NPM Dependencies
│   └── tailwind.config.js     # Tailwind CSS Config
└── .vscode/
    └── tasks.json             # VS Code Tasks
```

---

## 8. Features Implemented

✅ **Authentication System**
- User registration and login
- JWT token-based authentication
- Protected routes

✅ **Mood Tracking**
- Daily mood entry form with 1-5 scale
- Optional notes for each entry
- Date selection
- One entry per day restriction

✅ **Data Visualization**
- Mood history list
- Trend analysis with line chart
- Mood distribution with doughnut chart
- Summary statistics

✅ **Modern UI/UX**
- Responsive design with Tailwind CSS
- Clean, modern interface
- Intuitive navigation
- Visual feedback and loading states

---

## 9. Next Steps / Future Enhancements

- [ ] Mood correlation analysis (mood vs. day of week, weather, etc.)
- [ ] Data export functionality
- [ ] Mobile app version
- [ ] Mood reminders/notifications
- [ ] Advanced analytics and insights
- [ ] Social features (optional mood sharing)
- [ ] Integration with health/fitness apps

---

## 10. Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 11. License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Happy mood tracking! 😊**
