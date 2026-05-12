import services from '@/services'; // Kamu mengimport sebagai 'services'
import { createContext, useEffect, useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router';

const defaultState = {
  taskDetailData: {},
  setTaskDetailData() {},
  taskId: '',
  listId: '',
  membersData: [],
  setMembersData() {},
  async fetchTaskDetail() {},
  async fetchProjectMembers() {},
};

export const ModalTaskDetailContext = createContext(defaultState);

const ModalTaskDetailProvider = ({ children }) => {
  const detailProjectData = useLoaderData();
  const [SearchParams] = useSearchParams();
  const [taskDetailData, setTaskDetailData] = useState({});
  const [membersData, setMembersData] = useState([]);

  const boardId = detailProjectData?.public_id; // Tambahkan optional chaining agar aman

  const taskId = SearchParams.get('taskId');
  const listId = SearchParams.get('listId');

  const fetchTaskDetail = async (id) => {
    try {
      // PERBAIKAN: Gunakan services.cards
      const response = await services.cards.getDetail(id);
      
      if (!response || !response.data) {
        console.log("Response kosong atau tidak valid.");
        return; 
      }

      // Pastikan struktur response backend kamu memang response.data.data
      setTaskDetailData(response.data.data || {});
    } catch (error) {
      console.error("Gagal ambil detail task:", error);
    }
  };

  const fetchProjectMembers = async (bId) => {
    try {
      const response = await services.boards.getMembers(bId);
      if (response && response.data) {
        setMembersData(response.data.data || []);
      }
    } catch (error) {
      console.error("Gagal ambil members:", error);
    }
  };

  const initTaskDetail = async () => {
    // Jalankan secara paralel agar lebih cepat
    await Promise.all([
      fetchTaskDetail(taskId),
      fetchProjectMembers(boardId)
    ]);
  };

  useEffect(() => {
    // Validasi ketat: pastikan semua ID benar-benar ada dan bukan string "undefined"
    if (taskId && taskId !== 'undefined' && boardId) {
      initTaskDetail();
    }
  }, [taskId, boardId]); // listId dihapus dari dependency jika tidak dipakai untuk fetch

  return (
    <ModalTaskDetailContext.Provider
      value={{
        taskId,
        listId,
        taskDetailData,
        fetchTaskDetail,
        fetchProjectMembers,
        membersData,
        setTaskDetailData, // Tambahkan ini jika butuh update manual dari UI
      }}
    >
      {children}
    </ModalTaskDetailContext.Provider>
  );
};

export default ModalTaskDetailProvider;