import { useQuery } from 'react-query';
import { fetchCompletedTodos } from '../api/axios';
import TodoItem from './TodoItem';
import { TodoItemProps } from './Types';

const CompletedTodoList: React.FC = () => {
  const { data: todos, isLoading, error } = useQuery('completedTodos', fetchCompletedTodos);

  if (isLoading) return <div>Loading...</div>;
  
  if (error) return <div>No task available</div>;

  return (
    <div>
      {todos.map((todo: TodoItemProps) => (
        <TodoItem key={todo.id}  todo={todo} />
      ))}
    </div>
  );
};

export default CompletedTodoList;
