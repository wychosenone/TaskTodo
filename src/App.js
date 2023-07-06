import "./index.css";
import { TaskTracker } from "./TaskTracker";
import TaskProvider from "./TaskContext";

export default function App() {
  
  return (
    <TaskProvider>
    <div className="App">
      <TaskTracker
      />
    </div>
    </TaskProvider>
  );
}
