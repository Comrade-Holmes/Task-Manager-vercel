import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([{ id: Date.now(), text: task, completed: false }, ...tasks]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Task Manager</h1>
        <p>Beautiful React Task Manager with smooth animations.</p>

        <div className="inputBox">
          <input
            type="text"
            placeholder="Add your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
          <button onClick={addTask}>
            <Plus size={18} /> Add
          </button>
        </div>

        <div className="taskList">
          <AnimatePresence>
            {tasks.map((item) => (
              <motion.div
                key={item.id}
                className={`task ${item.completed ? 'done' : ''}`}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
              >
                <div className="left" onClick={() => toggleTask(item.id)}>
                  <CheckCircle2 size={20} />
                  <span>{item.text}</span>
                </div>

                <button className="deleteBtn" onClick={() => deleteTask(item.id)}>
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
