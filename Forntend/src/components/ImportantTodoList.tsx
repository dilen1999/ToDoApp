import { useQuery } from 'react-query';
import { fetchImportantTodos } from '../api/axios';
import TodoItem from './TodoItem';
import { TodoItemProps } from './Types';

const ImportantTodoList: React.FC = () => {
  const { data: todos, isLoading, error } = useQuery('importantTodos', fetchImportantTodos);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>No task Available </div>;

  return (
    <div>
      {todos.map((todo: TodoItemProps) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default ImportantTodoList;
