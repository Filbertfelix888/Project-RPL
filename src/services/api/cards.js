import network from '@/utils/network';

const cards = {
  async create(data) {
    return network.post('/api/v1/cards', data);
  },

  async update(cardId, data) {
    // TAMBAHKAN PROTEKSI
    if (!cardId || cardId === 'undefined') return;
    return network.put(`/api/v1/cards/${cardId}`, data);
  },

  async remove(cardId) {
    if (!cardId || cardId === 'undefined') return;
    return network.delete(`/api/v1/cards/${cardId}`);
  },

  async getDetail(cardId) {
    // Validasi: Jangan tembak kalau cardId kosong, null, atau string "undefined"
    if (!cardId || cardId === 'undefined') {
      console.warn("[Abort] getDetail dibatalkan karena cardId tidak valid.");
      return null; 
    }
    return network.get(`/api/v1/cards/${cardId}`);
  },

  async addAssignees(cardId, assignees) {
  console.log("ADD ASSIGNEES CARD ID:", cardId);
  console.log("ADD ASSIGNEES DATA:", assignees);

  if (!cardId || cardId === 'undefined') {
    console.error("[Error] addAssignees gagal: cardId kosong.");
    return null;
  }

  const payload = {
    user_id: Array.isArray(assignees)
      ? assignees
      : [assignees],
  };

  console.log("PAYLOAD:", payload);

  return network.post(
    `/api/v1/cards/${cardId}/assignees`,
    payload
  );
  },
  
  async removeAssignees(cardId, assignees) {
    if (!cardId || cardId === 'undefined') return;
    // Gunakan payload yang sama dengan add
    return network.delete(`/api/v1/cards/${cardId}/assignees`, {
        data: { user_id: Array.isArray(assignees) ? assignees : [assignees] }
    });
},
};

export default cards;