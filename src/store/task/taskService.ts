import axios from 'axios';
import { getCookie } from '../../helpers/cookie';
import { TaskGetByIdProps, TaskUpdateProps } from './../../components/interfaces';

const API_URL = 'https://frozen-depths-66382.herokuapp.com';

// Get task by id
const getTaskById = async (task: TaskGetByIdProps) => {
  const token = getCookie('user') || null;
  const response = await axios.get(
    `${API_URL}/boards/${task.boardId}/columns/${task.colId}/tasks/${task.taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Update task by id
const updateTask = async (task: TaskUpdateProps) => {
  const token = getCookie('user') || null;
  const response = await axios.put(
    `${API_URL}/boards/${task.boardId}/columns/${task.columnId}/tasks/${task.taskId}`, 
    {
      title: task.title,
      order: task.order,
      description: task.description,
      userId: task.userId,
      boardId: task.boardId,
      columnId: task.columnId
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const taskService = {
  getTaskById,
  updateTask
};

export default taskService;
