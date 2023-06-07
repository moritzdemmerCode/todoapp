import React from 'react';

const Todo = ({ todo, provided, removeTodo, onEditTodo }) => {
    return (
        <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onDoubleClick={() => onEditTodo(todo)}
            className="bg-blue-100 p-4 my-2 rounded shadow-lg text-gray-800 relative hover:bg-blue-200 transition-colors duration-200"
        >
            <button
                onClick={() => removeTodo(todo.id, todo.status)}
                className="absolute right-1 top-1 bg-red-500 p-1 rounded-xl text-white shadow-lg hover:bg-red-700 transition-colors duration-200"
            >
                X
            </button>
            <h2 className="text-xl mb-2 font-bold">{todo.title}</h2>
            <p>{todo.description}</p>
        </div>
    );
};

export default Todo;