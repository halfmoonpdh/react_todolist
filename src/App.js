import React, { Component } from "react";
import TodoListTemplate from "./components/TodoListTemplate";
import Form from "./components/Form";
import TodoItemList from "./components/TodoItemList";

class App extends Component {
  id = 3;

  state = {
    input: "",
    todos: [
      { id: 0, text: "리액트 예제 해보기", checked: false },
      { id: 1, text: "TO DO LIST 만들기", checked: true },
      { id: 2, text: "리액트 공부", checked: false }
    ]
  };
  handleChange = e => {
    this.setState({
      input: e.target.value
    });
  };
  handleCreate = () => {
    const { input, todos } = this.state;
    this.setState({
      input: "",
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false
      })
    });
  };
  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.handleCreate();
    }
  };
  handleToggle = id => {
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];
    const nextTodos = [...todos];

    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    });
  };
  handleRemove = id => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  };

  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove
    } = this;
    return (
      <div>
        <TodoListTemplate
          form={
            <Form
              value={input}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              onCreate={handleCreate}
            />
          }
          children={
            <TodoItemList
              todos={todos}
              onToggle={handleToggle}
              onRemove={handleRemove}
            />
          }
        ></TodoListTemplate>
      </div>
    );
  }
}

export default App;
