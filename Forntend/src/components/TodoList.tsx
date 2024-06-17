import { useQuery } from 'react-query';
import { fetchTodos } from '../api/axios';
import TodoItem from './TodoItem';
import { TodoItemProps } from './Types';
import { AxiosError } from 'axios';

const TodoList: React.FC = () => {
  const { data: todos, isLoading, error } = useQuery('todos', fetchTodos,{
        onError: (error: AxiosError) => {
            console.log(`Failed to fetch tasks \n${error.response?.data}`);
        },
        onSuccess: () => {
            console.log("Fetched tasks successfully");
        }
        });
  console.log(todos);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      {todos && todos.length > 0 ?(todos?.map((todo: TodoItemProps) => (
        <TodoItem key={todo.id} todo={todo} />
      ))) : (
        <p >No tasks</p>
      )}
    </div>
  );
};

export default TodoList;
