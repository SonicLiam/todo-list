// src/components/TodoList.tsx
import React, {useState} from 'react';
import TodoItem from '../TodoItem/Index'

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
    const [filter, setFilter] = useState(Filter.All);

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
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="输入新任务"
                />
                <button type={"submit"}>新增</button>
            </form>

            <div>
                <span>筛选：</span>
                <button onClick={() => setFilter(Filter.All)}>全部</button>
                <button onClick={() => setFilter(Filter.Active)}>未完成</button>
                <button onClick={() => setFilter(Filter.Completed)}>已完成</button>
                <span>&nbsp; 累计：{filteredTodos.length}</span>
                <button onClick={() => setTodos(todos.filter(todo => !todo.completed))}>清除已完成</button>
            </div>
            {filteredTodos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    task={todo.task}
                    completed={todo.completed}
                    onToggleCompleted={toggleCompleted}
                    onDelete={deleteTodo}
                    onUpdate={updateTodo}
                />
            ))}
        </div>
    );
};

export default Index;