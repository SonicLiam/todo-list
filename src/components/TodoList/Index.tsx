// src/components/TodoList.tsx
import React, {useEffect, useState, useRef} from 'react';
import TodoItem from '../TodoItem/Index'
import './Index.css';

interface Todo {
    id: number;
    task: string;
    completed: boolean;
}

enum Filter {
    All,
    Active,
    Completed,
}

const Index: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState(Filter.All); // 筛选
    const [collapsed, setCollapsed] = useState(true); // 是否折叠

    const filteredTodos = todos.filter((todo) => {
        switch (filter) {
            case Filter.Active:
                return !todo.completed;
            case Filter.Completed:
                return todo.completed;
            default:
                return true;
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addTodo();
    }

    const addTodo = () => {
        if (newTask.trim()) {
            setTodos([
                ...todos,
                {id: Date.now(), task: newTask.trim(), completed: false},
            ]);
            setNewTask('');
        }
    };

    const toggleCompleted = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? {...todo, completed: !todo.completed} : todo
            )
        );
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const updateTodo = (id: number, newTask: string) => {
        setTodos(
            todos.map((todo) => (todo.id === id ? {...todo, task: newTask} : todo))
        );
    };


    return (
        <div className={"container"}>
            <div className={"new-todo"}>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <p className={
                        `rotate button-collapse ${!collapsed ? 'rotate-down' : ''}` // 按照语义应该是span，但是span不支持rotate
                    }>&gt;</p>
                </button>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="请输入待办内容"
                    />
                    <button type={"submit"} className={"button-submit"}>
                        <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.39532 0.996872H6.50469C6.22813 0.996872 6.00469 1.22031 6.00469 1.49687C6.00469 1.77343 6.22813 1.99687 6.50469 1.99687H9.39376C9.46563 1.99687 9.52501 2.05625 9.52501 2.12812V6.86406C9.52501 6.93593 9.46563 6.99531 9.39376 6.99531H1.47188L4.15626 4.31093C4.35157 4.11562 4.35157 3.79843 4.15626 3.60312C3.96094 3.40781 3.64376 3.40781 3.44844 3.60312L0.331256 6.72343C0.126569 6.92812 0.0140686 7.2 0.0140686 7.48906C0.0140686 7.77812 0.126569 8.05 0.331256 8.25468L3.47813 11.4016C3.57501 11.4984 3.70313 11.5484 3.83126 11.5484C3.95938 11.5484 4.08751 11.5 4.18438 11.4016C4.37969 11.2062 4.37969 10.8891 4.18438 10.6937L1.48751 7.99531H9.39532C10.0188 7.99531 10.5266 7.4875 10.5266 6.86406V2.12812C10.5266 1.50468 10.0188 0.996872 9.39532 0.996872Z"
                                fill="black" fill-opacity="0.25"/>
                        </svg>
                    </button>
                </form>
            </div>
            {todos.length !== 0 && <div className={"content"}>
                <div className={"separator"}/>
                <div
                    style={{height: collapsed ? 0 : 'auto'}}
                    className={`todo-list ${collapsed ? 'collapsed' : ''}`}>
                    {!collapsed && filteredTodos.map((todo) => (
                        <>
                            <TodoItem
                                key={todo.id}
                                id={todo.id}
                                task={todo.task}
                                completed={todo.completed}
                                onToggleCompleted={toggleCompleted}
                                onDelete={deleteTodo}
                                onUpdate={updateTodo}
                            />
                            <div className={"separator"}/>
                        </>
                    ))}
                </div>
                <div className={"toolbar"}>
                    <span className={"statistics"}>共{filteredTodos.length}项事项</span>
                    <div className={"filter"}>
                        <button
                            className={filter === Filter.All ? 'selected' : ''}
                            onClick={() => setFilter(Filter.All)}>全部
                        </button>
                        <button
                            className={filter === Filter.Completed ? 'selected' : ''}
                            onClick={() => setFilter(Filter.Completed)}>已完成
                        </button>
                        <button
                            className={filter === Filter.Active ? 'selected' : ''}
                            onClick={() => setFilter(Filter.Active)}>未完成
                        </button>
                    </div>
                    <button
                        className={"clear-completed"}
                        onClick={() => setTodos(todos.filter(todo => !todo.completed))}
                    >
                        <span
                            style={{visibility: todos.some(todo => todo.completed) ? 'visible' : 'hidden'}}>清除已完成事项</span>
                    </button>
                </div>
            </div>}
        </div>
    );
};

export default Index;