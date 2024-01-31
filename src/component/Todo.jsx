import React, { useReducer, useRef } from "react";
import Task from "./Task";
import "../App.css"

const initialState = [
  {
    text: "demo text",
    isHidden: false,
  },
];

const reducerFn = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, { text: action.payload, isHidden: false }];
    case "TOGGLE_TEXT":
      return state.map((el, i) => {
        return i === action.payload ? { ...el, isHidden: !el.isHidden } : el;
      });
  }
};
const Todo = () => {
  const [todo, dispatch] = useReducer(reducerFn, initialState);
  const inputRef = useRef()

  const focus = () =>{
    inputRef.current.focus();
  }
  return (
    <div>
      <div className="inputContainer">
        <input
          type="text"
          placeholder="What's on your mind? 🤔"
          ref={inputRef}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
                dispatch({ type: "ADD_TASK", payload: event.target.value });
                event.target.value = " "
            }
          }}
        />
      </div>
      <div className="contentContainer">
        {todo.map((el, i) => (
          <Task key={i} task={el} dispatch={dispatch} index={i} />
        ))}
      </div>
      <div className="btnContainer">
        <button onClick={focus}>Get back to writing 📝</button>
      </div>
    </div>
  );
};

export default Todo;
