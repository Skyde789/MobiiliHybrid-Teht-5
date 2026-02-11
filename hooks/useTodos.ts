import { useReducer } from 'react';
import { Todo } from '../types/Todo';

type TodoAction =
  | { type: 'ADD_TODO'; todo_title: string }
  | { type: 'TOGGLE_TODO'; todo_id: number }
  | { type: 'DELETE_TODO'; todo_id: number };

const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case 'ADD_TODO': {
      if (!action.todo_title.trim()) 
        return state;

      const maxId = state.length ? Math.max(...state.map(t => t.id)) : 0;

      return [...state, { id: maxId + 1, text: action.todo_title, completed: false }];
    }

    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.todo_id ? { ...todo, completed: !todo.completed } : todo
      );

    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.todo_id);

    default:
      return state;
  }
};

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const addTodo = (text: string) => {
    dispatch({ type: 'ADD_TODO', todo_title: text });
  };

  const toggleTodo = (id: number) => {
    dispatch({ type: 'TOGGLE_TODO', todo_id: id });
  };

  const deleteTodo = (id: number) => {
    dispatch({ type: 'DELETE_TODO', todo_id: id });
  };

  return { todos, addTodo, toggleTodo, deleteTodo };
};
