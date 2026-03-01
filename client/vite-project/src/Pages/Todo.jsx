import React,{useState,useEffect} from "react";
import MenuAppBar from "../components/MenuAppBar";
import TodoInput from "../components/TodoInput";
// import Todo from "./Pages/Todo";

const Todo = () => {
    return(
        <>
            <div>
            <MenuAppBar />
            <TodoInput />
            </div>
        </>
    )
}
export default Todo;