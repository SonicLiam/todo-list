// src/App.tsx
import React from 'react';
import './App.css';
import TodoList from './components/TodoList/Index';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>TodoList</h1>
        <TodoList />
      </header>
    </div>
  );
};

export default App;