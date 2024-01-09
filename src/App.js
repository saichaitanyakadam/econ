import { useEffect, useState } from "react";
import axios from "axios";
import { IoIosCheckmarkCircleOutline, IoIosTrash } from "react-icons/io";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [task, setTask] = useState("");
  const [edited, setEdited] = useState(false);
  useEffect(() => {
    const getTodods = async () => {
      setEdited(false);
      const { data } = await axios.get(
        "https://economize-todo-backend.onrender.com/todos"
      );
      setTodos(data);
    };
    getTodods();
  }, [edited]);
  const handleChange = (e) => {
    setTask(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://economize-todo-backend.onrender.com/todos", {
        todo: task,
        status: false,
      });
      setTask("");
      setEdited(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (todoId) => {
    await axios.delete(
      `https://economize-todo-backend.onrender.com/todos/${todoId}`
    );
    setEdited(true);
  };
  const handleEdit = async (todoId) => {
    await axios.put(
      `https://economize-todo-backend.onrender.com/todos/${todoId}`
    );
    setEdited(true);
  };

  return (
    <div className="bg-sky-300 h-screen w-screen text-white flex justify-center items-center ">
      <div className="bg-gray-700 w-[90%] lg:w-[70%] p-4 min-h-[70vh] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <p>Saturday, June 1</p>
            <p>{todos.length} Active Tasks</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className={`${activeTab === 1 && "text-gray-400"}  `}
              onClick={() => {
                setActiveTab(0);
              }}
            >
              Incomplete Tasks
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab(1);
              }}
              className={`${activeTab === 0 && "text-gray-400"} `}
            >
              completed Tasks
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={task}
            placeholder="Enter a Task"
            className="h-[30px] w-[60%] text-black outline-none pl-3"
            onChange={handleChange}
          />
          <button type="submit" className="bg-sky-300 h-[30px] ml-5 px-5 ">
            Add Task
          </button>
        </form>
        <hr />
        {todos
          .filter((item) => item.status === activeTab)
          .map((item) => (
            <div key={item.id}>
              <div className="flex items-center w-full gap-3">
                <IoIosCheckmarkCircleOutline
                  className="text-gray-400"
                  onClick={() => {
                    handleEdit(item.id);
                  }}
                />
                <p className="justify-self-star text-lg">{item.todo}</p>
                <IoIosTrash
                  className="ml-auto text-gray-400 cursor-pointer"
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                />
              </div>
              <hr />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
