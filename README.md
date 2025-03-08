[![Coverage Status](https://coveralls.io/repos/github/USERNAME/REPO/badge.svg?branch=main)](https://coveralls.io/github/USERNAME/REPO?branch=main)

# Music Library Micro-Frontend Documentation

## Overview
This project demonstrates a micro-frontend architecture using React, showcasing how to set up host and remote applications that work together seamlessly. The application features a dynamic music library with authentication and authorization, allowing different user roles to interact with the library in specific ways.

---

## 🛠️ Features
- 🎵 **Music Library**: Browse, filter, sort, and group songs.
- 🌐 **Micro-Frontend Architecture**: Module Federation with Vite.
- 🔐 **Role-Based Authentication**:
  - **Admin**: Full access (add/remove songs).
  - **User**: View and filter songs only.
- 🧪 **Unit Testing**: 80%+ code coverage with Jest/React Testing Library.
- 🚀 **Performance Optimizations**: Lazy loading, efficient state management.

---

## 🎯 Goals
- Achieve a fully functional music library with micro-frontends.
- Ensure seamless authentication and role-based access control.
- Maintain high code quality with testing and coverage metrics.

---

## 📂 Project Structure
```
project-root
├─ host/               # Host application
│   ├─ src/
│   ├─ vite.config.ts  # Module Federation config
│   └─ ...
├─ remote/             # Music Library Micro-Frontend
│   ├─ src/
│   ├─ vite.config.ts  # Module Federation config
│   └─ ...
└─ shared/             # Shared libraries and utilities
```

---

## 🚀 Getting Started
### Prerequisites
- Node.js v14 or higher
- npm v6 or higher

### Installation
```bash
git clone https://github.com/lalithnarayan/microfrontend-finacPlus.git
cd react-microfrontend-demo
npm run install:deps
npm run preview
```

### Running the Application
1. Start the development server:
```bash
npm run preview
```
2. Open in browser:
```
http://localhost:4173/
```

---

## 🔑 Authentication & Authorization
- **JWT Authentication**:
  - In-memory authentication with role-based access.
  - Admins can add/remove songs.
  - Users can only view and filter songs.

---

## 🧪 Unit Testing & Code Coverage
- **Testing Frameworks**: Jest and React Testing Library.
- Achieve **80%+ code coverage**.
- Generate **HTML**, **console**, and **LCOV** reports.
- Run tests:
```bash
npm run test
```
- View coverage report:
```bash
npm run test:coverage
```

---

## 🌐 Micro-Frontend Implementation
- **Module Federation** with Vite.
- Remote applications are loaded dynamically into the host application.
- Shared dependencies managed through Module Federation.

---

## ⚙️ Design Decisions
- **Vite over Webpack** for faster builds and HMR.
- **React Context API** for state management.
- **Custom Hooks** for handling data filtering, sorting, and grouping.
- **Lazy Loading** for better performance.

---

## 💡 Additional Notes
- **GitHub Actions** configured for CI/CD (if applicable).
- Project adheres to **MIT License**.

---

## 👥 Contributions
- Contributions are welcome! Please submit a Pull Request if you'd like to contribute.

---

## 📜 License
This project is licensed under the **MIT License**. See the LICENSE file for more details.



## Screenshot

![screenshot](docs/screenshot.png)
![screenshot](docs/screenshot2.png)
![screenshot](docs/screenshot3.png)
