import "./App.css";
import styled from "styled-components";
import { MEDIA_QUERY_MD, MEDIA_QUERY_LG } from "./constants/style";

const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border: 1px solid green;

  & + & {
    margin-top: 12px;
  }
`;
const TodoContent = styled.div`
  color: ${(props) => props.theme.colors.primary_500};
  font-size: 12px;

  ${(props) =>
    props.size === "XL" &&
    `
    font-size: 40px;
  `}

  ${(props) =>
    props.$isDone &&
    `
    text-decoration: line-through; 
  `}
`;
const TodoButtonWrapper = styled.div``; // 不傳任何東西

const Button = styled.button`
  padding: 4px;
  color: green;
  font-size: 24px;

  ${MEDIA_QUERY_MD} {
    font-size: 18px;
  }

  ${MEDIA_QUERY_LG} {
    font-size: 14px;
  }

  &:hover {
    color: red;
  }

  & + & {
    margin-left: 4px;
  }
`;
// & 代表 Button 本身

// 重新做 style
const RedButton = styled(Button)`
  color: red;
`;
// 要傳給 style component 的變數，前面加上 $ 字號，就不會顯示在 html 上
export default function TodoItem({
  className,
  size,
  todo,
  handleDeleteTodo,
  handleToggleIsDone,
}) {
  const handleToggleClick = () => {
    handleToggleIsDone(todo.id);
  };
  const handleDeleteClick = () => {
    handleDeleteTodo(todo.id);
  };
  return (
    <TodoItemWrapper className={className} data-todo-id={todo.id}>
      <TodoContent $isDone={todo.isDone} size={size}>
        {todo.content}
      </TodoContent>
      <a href={window.encodeURIComponent(todo.content)}>click me</a>
      <TodoButtonWrapper>
        <Button onClick={handleToggleClick}>
          {todo.isDone ? "未完成" : "已完成"}
        </Button>
        <RedButton onClick={handleDeleteClick}>刪除</RedButton>
      </TodoButtonWrapper>
    </TodoItemWrapper>
  );
}
