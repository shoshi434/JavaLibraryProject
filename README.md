# 📚 Java Library Management System

## 🧩 Project Description

A **library management system** built with **Spring Boot** (backend) and **React** (frontend).  
The system enables management of **books**, **customers**, and **lending operations** within a library.

---

## 🏗️ System Architecture

| Layer       | Technology        | Description            |
|------------|-----------------|-----------------------|
| **Backend** | Spring Boot 3.4.5 | RESTful API server    |
| **Frontend** | React 18.2.0     | User interface        |
| **Database** | H2 (in-memory)   | Temporary DB for development |
| **ORM**      | JPA / Hibernate  | Object-relational mapping |
| **Build Tools** | Maven & npm   | Dependency management  |

---
## 📂 Project Structure

```bash
javaLibrary/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/         # React Components
│   │   │   ├── Book/           # Book Management
│   │   │   ├── Customer/       # Customer Management
│   │   │   ├── Lending/        # Lending Management
│   │   │   └── common/         # Shared Components
│   │   ├── services/           # API Services
│   │   ├── hooks/              # Custom React Hooks
│   │   ├── styles/             # CSS Files
│   │   └── utils/              # Utility Functions
│   └── package.json
└── server/                     # Spring Boot Backend
    └── demo/
        ├── src/main/java/com/example/demo/
        │   ├── Controller/     # REST Controllers
        │   ├── Entity/         # JPA Entities
        │   ├── Repository/     # Data Access Layer
        │   ├── Service/        # Business Logic
        │   └── DTO/            # Data Transfer Objects
        └── pom.xml
    # REST Controllers
        │   ├── Entity/         # JPA Entities
        │   ├── Repository/     # Data Access Layer
        │   ├── Service/        # Business Logic
        │   └── DTO/            # Data Transfer Objects
        └── pom.xml

```

---

## 🔗 API Documentation

### 📘 Books API

| Method | Endpoint           | Description        |
|--------|------------------|------------------|
| GET    | /api/books        | Get all books    |
| GET    | /api/books/{id}   | Get book by ID   |
| POST   | /api/books        | Add new book     |
| PUT    | /api/books/{id}   | Update book      |
| DELETE | /api/books/{id}   | Delete book      |

### 👥 Customers API

| Method | Endpoint             | Description        |
|--------|--------------------|------------------|
| GET    | /api/customers      | Get all customers |
| GET    | /api/customers/{id} | Get customer by ID |
| POST   | /api/customers      | Add new customer |
| PUT    | /api/customers/{id} | Update customer |
| DELETE | /api/customers/{id} | Delete customer |

### 🔄 Lending API

| Method | Endpoint           | Description        |
|--------|------------------|------------------|
| GET    | /api/lendings     | Get all lendings |
| GET    | /api/lendings/{id}| Get lending by ID |
| POST   | /api/lendings     | Create new lending |
| PUT    | /api/lendings/{id}| Update lending   |
| DELETE | /api/lendings/{id}| Delete lending   |

---

## ⚙️ Installation and Setup

### 🧾 Prerequisites

Make sure you have installed:  
☕ **Java 17+**  
🧱 **Maven 3.6+**  
💻 **Node.js 14+** and **npm**

---

### ▶️ Running the Backend

```bash
cd server/demo
./mvnw spring-boot:run
```
Server runs on: **http://localhost:8080**

---

### 💡 Running the Frontend

```bash
cd client
npm install
npm start
```
Client runs on: http://localhost:3000

---

## 🧠 Code Structure

### Backend Layers

| Layer        | Responsibility          |
|--------------|------------------------|
| **Controller** | REST endpoints         |
| **Service**    | Business logic         |
| **Repository** | Data access            |
| **Entity**     | Data model             |

### Frontend Components

| Type                 | Description                               |
|----------------------|-------------------------------------------|
| **Manager Components** | Views for managing entities (Books, Customers, Lending) |
| **Common Components**  | Shared components (Modal, ErrorBoundary, etc.)          |
| **Services**           | API communication logic                              |
| **Hooks**              | Custom React hooks (e.g., useModal)                  |

---

## 🚀 Future Development

- 🔐 User authentication  
- 📊 Reports & statistics  
- ⏰ Return date notifications  
- 🗄️ External database integration  
- 📜 Swagger API documentation  

---

## 👩‍💻 Contributors

This project was developed **for educational purposes** and as a demonstration of **Spring Boot + React** integration.

---

⭐ If you like this project, consider giving it a star on GitHub!
