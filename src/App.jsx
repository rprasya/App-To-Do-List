/* eslint-disable no-unreachable */
/* eslint-disable react/jsx-key */

import { useState } from "react";

function App() {
  // 1. buat state untuk input berupa string kosong
  const [activity, setActivity] = useState("");

  // 2. buat state untuk menampilkan activity di UI dengan array kosong
  const [todos, setTodos] = useState([]);

  // 8. buat state untuk membuat function edit button
  const [edit, setEdit] = useState({});

  // 6.
  // untuk mendapatkan id unique berdasarkan waktu sekarang
  const generateId = () => {
    return Date.now();
  };

  // 3.
  const saveTodoHandler = (event) => {
    event.preventDefault();

    //10. membuat mode edit
    if (edit.id) {
      const updatedTodo = {
        id: edit.id,
        activity,
      };

      const editTodoIndex = todos.findIndex((todo) => {
        return todo.id == edit.id;
      });

      const updatedTodos = [... todos]
      updatedTodos[editTodoIndex] = updatedTodo;

      setTodos(updatedTodos)

      return;
    }

    // 4.
    setTodos([
      ...todos,
      {
        id: generateId(),
        activity,
      },
    ]);

    // 5.
    setActivity("");
  };

  // 7. membuat remove button
  const removeTodoHandler = (todoId) => {
    const filteredTodos = todos.filter(function (todo) {
      return todo.id !== todoId;
    });

    setTodos(filteredTodos);
  };

  // 9. membuat edit button
  const editTodoHandler = (todo) => {
    setActivity(todo.activity);
    setEdit(todo);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-screen h-screen bg-slate-500">
        <h1 className="text-2xl mb-2">Simple Todo List</h1>
        <form action="" onSubmit={saveTodoHandler}>
          <input
            type="text"
            placeholder="Nama aktifitas"
            value={activity}
            onChange={(event) => {
              setActivity(event.target.value);
            }}
            className="p-1 rounded"
          />
          <button className="px-3 py-1 ml-2 bg-white rounded">
            {edit.id ? "Simpan perubahan" : "Tambah"}
          </button>
        </form>
        <ul>
          {todos.map((todo) => {
            return (
              <li key={todo.id}>
                {todo.activity}
                <button
                  className="px-2 py-1 mt-1 ml-1 bg-white text-black rounded"
                  onClick={editTodoHandler.bind(this, todo)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 mt-1 ml-1 bg-white text-black rounded"
                  onClick={removeTodoHandler.bind(this, todo.id)}
                >
                  Hapus
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
