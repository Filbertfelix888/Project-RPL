import network from '@/utils/network';

const boards = {
  async myBoards(params) {
    return network.get('/api/v1/boards/my', {
      params,
    });
  },

  async create(data) {
    return network.post('/api/v1/boards', data);
  },

  async update(boardID, data) {
    return network.put(`/api/v1/boards/${boardID}`, data);
  },

  async detail(boardID) {
    return network.get(`/api/v1/boards/${boardID}`);
  },
  async lists(boardID) {
    return network.get(`/api/v1/boards/${boardID}/lists`);
  },
  async updateListPosition(boardID, data) {
    return network.put(`/api/v1/boards/${boardID}/positions`, data);
  },
  async addMember(boardID, userIds) {
    return network.post(`/api/v1/boards/${boardID}/members`, userIds);
  },
  async getMembers(boardID) {
    return network.get(`/api/v1/boards/${boardID}/members`);
  },
};

export default boards;
