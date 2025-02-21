import React, { useState } from 'react';
import styled from 'styled-components';
import TaskItem from './TaskItem';

const ColumnContainer = styled.div`
  width: 32%;
  background: ${({ theme }) => theme.taskColumnBg};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.taskColumnHoverBoxShadow};
  }
`;

const ColumnTitle = styled.h2`
  text-align: center;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.taskTitleColor};
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AddTaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const AddTaskInput = styled.input`
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.addTaskInputBorder};
  border-radius: 8px;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.addTaskInputBg};
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.addTaskInputFocusBorder};
    box-shadow: 0 0 8px rgba(0, 121, 107, 0.2);
  }
`;

const AddTaskButton = styled.button`
  padding: 12px 24px;
  background: ${({ theme }) => theme.addTaskButtonBg};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.addTaskButtonHoverBg};
    transform: scale(1.05);
  }
`;

function TaskColumn({
  title,
  tasks,
  onAddTask,
  onMoveTask,
  onDeleteTask,
  onEditTask,
  columnName,
}) {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      onAddTask(newTask);
      setNewTask('');
    }
  };
  const handleEdit = (taskId, newTitle) => {
    onEditTask(taskId, newTitle, columnName); // вызовете onEditTask, передав taskId, newTitle и columnName
  };
  

  return (
    <ColumnContainer>
      <ColumnTitle>{title}</ColumnTitle>
      <TaskList>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onMoveTask={onMoveTask}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
            columnName={columnName}
          />
        ))}
      </TaskList>
      {columnName === 'todo' && (
        <AddTaskContainer>
          <AddTaskInput
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
          />
          <AddTaskButton onClick={handleAddTask}>Add</AddTaskButton>
        </AddTaskContainer>
      )}
    </ColumnContainer>
  );
}

export default TaskColumn;
