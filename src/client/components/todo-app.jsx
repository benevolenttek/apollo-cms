import React from "react";
import Header from './header';
import Footer from "./footer";
import AddTodo from "../containers/add-todo";
import VisibleTodoList from "../containers/visible-todo-list";

const TodoApp = () => (
  <div>
    <Header/>
    <AddTodo/>
    <VisibleTodoList/>
    <Footer/>
  </div>
);

export default TodoApp;
