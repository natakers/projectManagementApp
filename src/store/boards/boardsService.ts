import axios from 'axios';
import { getCookie } from '../../helpers/cookie';

const API_URL = 'https://frozen-depths-66382.herokuapp.com';

// Get task by id
const getBoardById = async (boardId: string) => {
  const token = getCookie('user') || null;
  const response = await axios.get(
    `${API_URL}/boards/${boardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const boardsService = {
  getBoardById
};

export default boardsService;
