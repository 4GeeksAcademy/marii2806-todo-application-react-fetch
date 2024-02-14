import React, {useState} from "react";

const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            e.preventDefault();
            setTodos([...todos, inputValue.trim()]);
            setInputValue("");
        }
    };

    const handleDeleteTodo = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
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
                        {item}{" "}
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