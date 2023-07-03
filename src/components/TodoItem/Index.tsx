// src/components/TodoItem.tsx
import React, {useState} from 'react';

interface TodoItemProps {
    id: number;
    task: string;
    completed: boolean;
    onToggleCompleted: (id: number) => void;
    onDelete: (id: number) => void;
    onUpdate: (id: number, newTask: string) => void;
}

const Index: React.FC<TodoItemProps> = ({
                                            id,
                                            task,
                                            completed,
                                            onToggleCompleted,
                                            onDelete,
                                            onUpdate,
                                        }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTask, setNewTask] = useState(task);

    const handleUpdate = () => {
        onUpdate(id, newTask);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={handleUpdate}>更新</button>
                <button onClick={() => setIsEditing(false)}>取消</button>
            </div>
        );
    }

    return (
        <div>
            <input
                type="checkbox"
                checked={completed}
                onChange={() => onToggleCompleted(id)}
            />
            <span style={{textDecoration: completed ? 'line-through' : 'none'}}>
        {task}
      </span>
            <button onClick={() => setIsEditing(true)}>编辑</button>
            <button onClick={() => onDelete(id)}>删除</button>
        </div>
    );
};

export default Index;