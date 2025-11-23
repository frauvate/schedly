const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("data.db");

// tablolar
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    day TEXT,
    text TEXT,
    done INTEGER DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS schedule (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    day TEXT,
    name TEXT,
    time TEXT,
    prof TEXT,
    room TEXT,
    color TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS study_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course TEXT,
    minutes INTEGER
  )`);
});

function createWindow() {
  const win = new BrowserWindow({
    width: 480,
    height: 900,
    resizable: true,
    webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: false
    }
  });
  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

//
// IPC HANDLERS
//

// TODOS
ipcMain.handle("todos:getByDay", (e, day) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM todos WHERE day = ? ORDER BY id", [day], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
});

ipcMain.handle("todos:add", (e, { day, text }) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO todos (day, text, done) VALUES (?, ?, 0)",
      [day, text],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  });
});

ipcMain.handle("todos:updateDone", (e, { id, done }) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE todos SET done = ? WHERE id = ?",
      [done ? 1 : 0, id],
      err => (err ? reject(err) : resolve())
    );
  });
});

ipcMain.handle("todos:updateDay", (e, { id, day }) => {
  return new Promise((resolve, reject) => {
    db.run("UPDATE todos SET day = ? WHERE id = ?", [day, id], err =>
      err ? reject(err) : resolve()
    );
  });
});

ipcMain.handle("todos:delete", (e, id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM todos WHERE id = ?", [id], err =>
      err ? reject(err) : resolve()
    );
  });
});

// SCHEDULE
ipcMain.handle("schedule:getByDay", (e, day) => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM schedule WHERE day = ? ORDER BY time IS NULL, time",
      [day],
      (err, rows) => (err ? reject(err) : resolve(rows))
    );
  });
});

ipcMain.handle("schedule:add", (e, course) => {
  const { day, name, time, prof, room, color } = course;
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO schedule (day, name, time, prof, room, color)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [day, name, time || null, prof || null, room || null, color || null],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  });
});

ipcMain.handle("schedule:delete", (e, id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM schedule WHERE id = ?", [id], err =>
      err ? reject(err) : resolve()
    );
  });
});

// STUDY STATS
ipcMain.handle("study:add", (e, { course, minutes }) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO study_stats (course, minutes) VALUES (?, ?)",
      [course, minutes],
      err => (err ? reject(err) : resolve())
    );
  });
});

ipcMain.handle("study:getAll", () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT course, minutes FROM study_stats", [], (err, rows) =>
      err ? reject(err) : resolve(rows)
    );
  });
});
