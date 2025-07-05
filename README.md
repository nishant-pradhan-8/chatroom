# 💬 Real-Time Chat Application

A real-time chat application built with **Node.js**, **Express**, **MongoDB**, **Socket.IO**, and **React**. This app allows users to register, log in, and participate in a live group chat. Messages are sent and received instantly using WebSockets and stored in a MongoDB database.

---

## ✨ Features

### 🔧 Backend (Node.js + Express + MongoDB + TypeScript)
- ✅ User Registration and Login (JWT Authentication)
- ✅ Authorization for protected routes
- ✅ CRUD operations for users
- ✅ Real-time communication with Socket.IO
- ✅ Message persistence in MongoDB
- ✅ API endpoint to return:
  - Total number of users
  - Total number of messages

### 🎨 Frontend (React + TailwindCSS + TypeScript)
- ✅ User login and registration forms
- ✅ Real-time chat UI:
  - Send and receive messages instantly
  - View messages with sender and timestamp
- ✅ Listen to socket events: new messages, new users joining
- ✅ Simple and responsive UI layout

---

## 📦 Tech Stack

| Technology      |
|-----------------|
| **Node.js**     |
| **Express**     |
| **MongoDB**     |
| **Socket.IO**   |
| **React**       |
| **TailwindCSS** |
| **TypeScript**  |
| **Material UI** |

---

## 🖥️ Run Locally

Follow these steps to run the project on your local machine:

### 🔧 Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) running locally or MongoDB Atlas URI

---

### 1. Clone the Repository

```bash
git clone https://github.com/nishant-pradhan-8/chatroom.git
```

### 2. Backend Setup
- cd server
- npm install
- cp .env.example .env
- npm run dev

### 3. Frontend Setup
- cd client
- npm install
- cp .env.example .env
- npm run dev


## 📸 Screenshots

### 🔐 Login Page

![Login Page](../chatroom/client/public/images/login.png)

---

### 🔐 Registration Page

![Login Page](../chatroom/client/public/images/registration.png)

---

### 📨 Chat Interface

![Chat Interface](../chatroom/client/public/images/home.png)
![Chat Interface](../chatroom/client/public/images/messages.png)
---

### 👥 Account Details Dialog

![Register Page](../chatroom/client/public/images/dialog.png)
