import "./App.css";
import TodoItem from "./TodoItem";
import { useState, useRef } from "react";

function App() {
  // immutable
  const [todos, setTodos] = useState([
    { id: 1, content: "abc", isDone: true },
    { id: 2, content: "not done", isDone: false },
  ]);

  const [value, setValue] = useState("");
  const id = useRef(3);
  // 設定初始值 ＝ 2
  // useRef 會回傳一個物件
  // {
  //   current: 2
  // }
  const handleButtonClick = () => {
    setTodos([
      {
        id: id.current,
        content: value,
      },
      ...todos,
    ]);
    setValue("");
    id.current++;
  };

  const handleToggleIsDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  // 把要做的事情寫在 parent，parent 再傳給 child，child 再呼叫這個 function，就可以在 parent 處理這段資訊
  // [1, 2, 3].filter(i => i > 1)  i 大於 1 的會留下來
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="todo"
        value={value}
        onChange={handleInputChange}
      />
      <button onClick={handleButtonClick}>Add todo</button>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleIsDone={handleToggleIsDone}
        />
      ))}
    </div>
  );
}

export default App;
