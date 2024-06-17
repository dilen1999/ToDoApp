import axios from 'axios';
import { TodoItemProps } from '../components/Types';

const apiClient = axios.create({
  baseURL: 'http://localhost:5170',
    headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchTodos = async () => {
  const response = await apiClient.get('/api/Todo');
  return response.data;
};

export const fetchImportantTodos = async () => {
  const response = await apiClient.get('/api/Todo/important');
  return response.data;
};

export const fetchCompletedTodos = async () => {
  const response = await apiClient.get('/api/Todo/completed');
  return response.data;
};

export const creatTodo = async (todo : {taskName:string,isImportant:boolean}): Promise<TodoItemProps> => {
  const response = await apiClient.post<TodoItemProps>('/api/Todo', todo);
  return response.data;
}
export const updateTodo = async (todo: TodoItemProps) => {
  const response = await apiClient.put('/api/Todo', todo);
  return response.data;
};

export const deleteTodo = async (id: number) => {
  const response = await apiClient.delete(`/api/Todo/${id}`);
  return response.data;
};

export const makeTaskDone = async (id: number) => {
  const response = await apiClient.put(`/api/Todo/done/${id}`);
  return response.data;
}   