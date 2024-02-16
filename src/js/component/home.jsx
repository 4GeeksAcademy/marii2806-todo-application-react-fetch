import React, {useEffect, useState} from "react";

const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

useEffect(() => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/marii2806")
            .then((response) => response.json())
            .then((data) => {
                setTodos(data)
            })
            .catch((error) => console.log(error))
},[])

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            e.preventDefault();
            let todo = {
                done: false,
                label: inputValue.trim()
            }
            let newTodos = todos
            newTodos.push(todo)
            setInputValue("");
            fetch("https://playground.4geeks.com/apis/fake/todos/user/marii2806", {
                method: "PUT",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(newTodos)
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setTodos(newTodos);
            })
            .catch((error) => console.log(error))
        }
    };

    const handleDeleteTodo = (index) => {
        let filterTodos = todos.filter((_, i) => i !== index)
        fetch("https://playground.4geeks.com/apis/fake/todos/user/marii2806", {
                method: "PUT",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(filterTodos)
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setTodos(filterTodos);
            })
            .catch((error) => console.log(error))
    };

    return (
        <div className="container">
            <h1>todos</h1>
            <ul className = "container-fluid list-group list-group flush">
                <li>
                    <input
                        type="text"
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                        onKeyDown={handleKeyDown}
                        placeholder="What I need to do?"
                    />
                </li>
                {todos.map((item, index) => (
                    <li key={index}>
                        {item.label}{" "}
                        <i
                            onClick={() => handleDeleteTodo(index)}
                        >
                            🗑️
                        </i>
                    </li>
                ))}
            </ul>
            <div className = "footer">{todos.length} tasks left</div>
        </div>
    );
};

export default Home;