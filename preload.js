const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  // todos
  getTodosByDay: (day) => ipcRenderer.invoke("todos:getByDay", day),
  addTodo: (day, text) => ipcRenderer.invoke("todos:add", { day, text }),
  updateTodoDone: (id, done) => ipcRenderer.invoke("todos:updateDone", { id, done }),
  updateTodoDay: (id, day) => ipcRenderer.invoke("todos:updateDay", { id, day }),
  deleteTodo: (id) => ipcRenderer.invoke("todos:delete", id),

  // schedule
  getScheduleByDay: (day) => ipcRenderer.invoke("schedule:getByDay", day),
  addCourse: (course) => ipcRenderer.invoke("schedule:add", course),
  deleteCourse: (id) => ipcRenderer.invoke("schedule:delete", id),

  // study
  addStudySession: (course, minutes) =>
    ipcRenderer.invoke("study:add", { course, minutes }),
  getStudySessions: () => ipcRenderer.invoke("study:getAll")
});
