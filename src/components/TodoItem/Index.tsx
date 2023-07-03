// src/components/TodoItem.tsx
import React, {useState} from 'react';
import './Index.css';

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
    const [hover, setHover] = useState(false);
    const [needToUpdate, setNeedToUpdate] = useState(false);
    const taskTextRef = React.useRef<HTMLElement>(null);

    const handleUpdate = () => {
        setNeedToUpdate(true);
        onUpdate(id, taskTextRef!.current!.textContent!);
        setIsEditing(false);
    };

    return (
        <>
            <div
                className="todo-item"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <input
                    className={'todo-item-checkbox'}
                    type="checkbox"
                    checked={completed}
                    onChange={() => onToggleCompleted(id)}
                />
                <span
                    ref={taskTextRef}
                    contentEditable={true}
                    className={`todo-item-task ${completed ? 'todo-item-task-completed' : ''}`}
                    onFocus={() => setIsEditing(true)}
                    onBlur={() => {
                        if (needToUpdate) return;
                        taskTextRef!.current!.textContent = task;
                        setIsEditing(false)
                    }}>
                {task}
            </span>
                {isEditing &&
                    <button
                        className={'todo-item-update'}
                        onMouseDown={() => handleUpdate()}>
                        修改
                    </button>
                }
                <button
                    className={'todo-item-delete'}
                    onClick={() => onDelete(id)}
                    style={{display: hover && !isEditing ? 'inline' : 'none'}}
                >
                    &#10006;
                </button>
            </div>
            {isEditing &&
                <div className={'todo-item-edit-tip'} >
                    <p>点击任意处取消编辑</p>
                </div>}
        </>
    );
};

export default Index;