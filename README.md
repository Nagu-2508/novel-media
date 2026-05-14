# 📖 NovelMedia

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</p>

---

## ✨ Overview

**NovelMedia** is a premium, modern platform designed for storytellers and book lovers. Whether you're an aspiring novelist looking to share your world or a reader searching for your next favorite story, NovelMedia provides a seamless, immersive experience.

> "Where every story finds its voice."

---

## 🚀 Features

- **🎨 Premium UI/UX**: A stunning dark-themed interface with glassmorphism, smooth animations, and vibrant accent glows.
- **✍️ Intuitive Creator Studio**: A multi-chapter editor that allows authors to publish their work with ease, including customizable cover colors.
- **🔍 Advanced Discovery**: Search and filter through novels by genre, popularity, or date.
- **📖 Immersive Reader**: A focused reading environment with easy chapter navigation.
- **💬 Community Reviews**: Readers can rate and leave reviews on their favorite novels.
- **📱 Fully Responsive**: Enjoy a premium reading experience on any device, from desktop to mobile.

---

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS (Custom Design System)
- **Backend**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- **Routing**: React Router 6
- **Storage**: Local JSON (Easily scalable to MongoDB/PostgreSQL)

---

## 📂 Project Structure

```bash
novelmedia/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page views (Home, Explore, Reader, Publish)
│   │   ├── api.js          # Backend API services
│   │   └── index.css       # Global design system
├── server/                 # Express Backend
│   ├── data/               # Local JSON database
│   └── index.js            # API Entry point
└── .gitignore              # Project ignore rules
```

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Nagu-2508/novel-media.git
cd novel-media
```

### 2️⃣ Setup Backend
```bash
cd server
npm install
node index.js
# Server runs on http://localhost:5001
```

### 3️⃣ Setup Frontend
```bash
cd ../client
npm install
npm run dev
# App runs on http://localhost:5173
```

---

## 🎨 Design System

NovelMedia uses a custom-built design system focused on:
- **Color Palette**: Deep space purples, electric blues, and neon accents.
- **Typography**: `Inter` for clarity and `Playfair Display` for a classic literary feel.
- **Glassmorphism**: High-blur backdrops for a modern, tactile feel.

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/Nagu-2508">Nagu-2508</a>
</p>
