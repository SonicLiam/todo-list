// src/components/TodoList.tsx
import React, { useState } from 'react';
import TodoItem from '../TodoItem/Index'

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

const Index: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTodo = () => {
    if (newTask.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), task: newTask.trim(), completed: false },
      ]);
      setNewTask('');
    }
  };

  const toggleCompleted = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id: number, newTask: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, task: newTask } : todo))
    );
  };

  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="输入新任务"
      />
      <button onClick={addTodo}>新增</button>
      {todos.map((todo) => (
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