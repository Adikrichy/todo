import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components for design
const TaskItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.taskItemBg};
  padding: 1rem 1.2rem;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.taskItemBoxShadow};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateX(3px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  }
`;

const TaskTitle = styled.span`
  color: ${({ theme }) => theme.textColor};
  flex-grow: 1;
  cursor: ${({ isEditing }) => (isEditing ? 'initial' : 'pointer')};
`;

const TaskActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  color: white;
  background: ${({ theme, isSaveButton }) =>
    isSaveButton ? theme.saveButtonBg : theme.editButtonBg};
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
    background: ${({ theme, isSaveButton }) =>
      isSaveButton ? theme.saveButtonHoverBg : theme.editButtonHoverBg};
  }

  /* Additional styles for Save button */
  &.save-btn {
    background: #8e44ad; /* Purple color */
    color: white;
    font-weight: bold;
  }

  /* Additional styles for Edit button */
  &.edit-btn {
    background: #3498db; /* Blue color */
    color: white;
    font-weight: normal;
  }
`;

const LeftButton = styled(ActionButton)`
  background: ${({ theme }) => theme.taskActionButton1Bg};
  &:hover {
    background: ${({ theme }) => theme.taskActionButton1HoverBg};
  }
`;

const RightButton = styled(ActionButton)`
  background: ${({ theme }) => theme.taskActionButton2Bg};
  &:hover {
    background: ${({ theme }) => theme.taskActionButton2HoverBg};
  }
`;

const DeleteButton = styled(ActionButton)`
  background: ${({ theme }) => theme.taskActionButton3Bg};
  &:hover {
    background: ${({ theme }) => theme.taskActionButton3HoverBg};
  }
`;

const EditInput = styled.input`
  width: 100%;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.addTaskInputBorder};
  border-radius: 4px;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.addTaskInputBg};
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.addTaskInputFocusBorder};
    box-shadow: 0 0 8px rgba(0, 121, 107, 0.2);
  }
`;

const TaskItem = ({ task, onEditTask, onDeleteTask, onMoveTask, columnName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleEditToggle = () => setIsEditing(true); // Always start editing when clicked

  const handleTitleChange = (e) => setNewTitle(e.target.value);

  const handleSave = () => {
    if (newTitle.trim()) {
      onEditTask(task.id, newTitle, columnName);
      setIsEditing(false); // Automatically exit edit mode after saving
    }
  };

  const handleMove = (direction) => {
    if (direction === 'left' && columnName !== 'todo') {
      const newColumn = columnName === 'inProgress' ? 'todo' : 'inProgress';
      onMoveTask(task.id, columnName, newColumn);
    } else if (direction === 'right' && columnName !== 'completed') {
      const newColumn = columnName === 'todo' ? 'inProgress' : 'completed';
      onMoveTask(task.id, columnName, newColumn);
    }
  };

  return (
    <TaskItemContainer>
      {isEditing ? (
        <EditInput
          type="text"
          value={newTitle}
          onChange={handleTitleChange}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          autoFocus
        />
      ) : (
        <TaskTitle isEditing={isEditing} onClick={handleEditToggle}>
          {task.title}
        </TaskTitle>
      )}

      <TaskActions>
        <LeftButton onClick={() => handleMove('left')}>←</LeftButton>
        <RightButton onClick={() => handleMove('right')}>→</RightButton>
        <DeleteButton onClick={() => onDeleteTask(task.id, columnName)}>Delete</DeleteButton>

        {isEditing ? (
          <ActionButton isSaveButton className="save-btn" onClick={handleSave}>
            Save
          </ActionButton>
        ) : (
          <ActionButton className="edit-btn" onClick={handleEditToggle}>
            Edit
          </ActionButton>
        )}
      </TaskActions>
    </TaskItemContainer>
  );
};

export default TaskItem;
