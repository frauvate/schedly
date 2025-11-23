# 🧩 Schedly — Minimal Productivity Desktop App

A lightweight, offline-first productivity widget built with **Electron**, **SQLite**, and **vanilla HTML/CSS/JS**. Schedly brings together your **to‑do lists**, **weekly schedule**, **Pomodoro timer**, and **study analytics** into one clean, minimal, always-available desktop app.

---

## ✨ Features

### ✔ To‑Do Lists (Daily)

* Separate tasks for each day of the week
* Mark tasks as **done**, **postpone**, or **cancel**
* Automatic sorting (done tasks move down)
* All tasks are stored locally in **SQLite**

### ✔ Weekly Schedule

* Add courses/meetings with:

  * time
  * professor (optional)
  * room (optional)
  * custom color tag
* View schedule per day
* Delete or update items easily

### ✔ Pomodoro Timer

* Select work & break durations
* Real-time countdown UI
* Session history log
* Option to assign each session to a **course**

### ✔ Study Insights (Donut Analytics)

* Automatically logs your study sessions
* Visual donut chart showing time spent per course
* Auto‑drawn connector lines + labels for readability
* Fully offline, stored in **SQLite**

---

## 📦 Tech Stack

* **Electron** — desktop application shell
* **SQLite** — local persistent database
* **Vanilla JS** — logic
* **Canvas API** — custom donut chart
* **HTML/CSS** — minimal, clean UI

---

## 🚀 Setup & Run

### 1) Install dependencies

```
npm install
```

### 2) Start the app in development mode

```
npm start
```

### 3) Build a desktop executable (Windows/Linux/macOS)

```
npm run build
```

The compiled app will appear inside the `dist/` folder.

---

## 🗂 Project Structure

```
schedly/
│
├── index.html        # UI + frontend logic
├── main.js           # Electron main process
├── preload.js        # API bridge (IPC)
├── package.json
├── data.db           # auto‑generated SQLite file
├── .gitignore
└── dist/             # build output (generated)
```

---

## 🎥 Demo / GIFs

*Add your usage GIFs here!*

Example placeholder:

```
![Schedly Demo](demo/schedly-demo.gif)
```

---

## 🧠 Future Improvements (Optional Ideas)

* System tray minimization
* Light/Dark mode toggle
* Cloud sync

---

Made with ❤️ by **Esma**.

---
