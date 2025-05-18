# 🧠 AI_Powered MentalHealth Counselling ChatBot

An AI-powered chatbot that provides mental health support through empathetic, human-like conversations. It analyzes user messages and chat history using NLP to detect emotional states like stress, anxiety, fear, joy, sadness, and depression. Based on these insights, it offers thoughtful responses, guidance, and, in critical conditions, automatically connects users with a mental health expert.

---

## 🚀 Live Demo

[Try the ChatBot Live](https://your-live-demo-link.com)



## 🧠 Features

- 💬 Engages in human-like conversations with users.
- 🧠 Analyzes both **real-time messages** and **chat history** for better emotional understanding.
- 🔍 Uses NLP-based sentiment analysis to detect:
  - `stress`, `anxiety`, `depression`, `sadness`, `fear`, `joy`
- 🤝 Acts as a mentor or friendly companion for the user to share feelings.
- 🎯 Provides personalized suggestions based on emotional state.
- 🚨 If a user's stress score crosses a critical threshold, the chatbot:
  - Automatically connects them to a **mental health expert**.
  - Allows **manual opt-in** for expert connection.
- 🎥 Includes **video calling** functionality using **Jitsi Meet API**.
- 🔐 Secure user authentication using `JWT` and `bcrypt.js`.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Bootstrap 5

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB (MongoDB Atlas)

**Authentication:**
- JSON Web Token (JWT)
- bcrypt.js

**Other Tools:**
- Jitsi Meet (Video Calling)
- NLP Model for Sentiment Analysis

---

## 📁 Folder Structure

```
AI_Powered_MentalHealth_Counselling_ChatBot/
├── frontend/
│   └── src/
│       └── components/
├── backend/
│   └── src/
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       ├── db/
│       ├── routes/
│       ├── utils/
│       └── index.js
├── README.md
└── .env

```
---

## ⚙️ Installation & Setup

To run this project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/Aman_782/AI_Powered_MentalHealth_Counselling_ChatBot.git
cd AI_Powered_MentalHealth_Counselling_ChatBot
```

### 2. Move to Backend

  ```
  cd backend
  npm install
  ```

### 3. Create a .env file
 ```
   MONGO_URI=your-mongodb-connection-uri
   JWT_SECRET=your-jwt-secret
   JITSI_DOMAIN=meet.jit.si
 ```
### 4. Start index.js
  ```
   cd src
   Nodemon index.js
  ```

### 5. Move to Frontend
  ```
  cd Frontend
  npm i
  npm run dev
 ```

---

### 👤 **Author**

[![GitHub](https://img.shields.io/badge/GitHub-AmanPandey-181717?style=for-the-badge&logo=github)](https://github.com/Aman_782)  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-amanpandey-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/aman-pandey-a61b4521a/)  


---


