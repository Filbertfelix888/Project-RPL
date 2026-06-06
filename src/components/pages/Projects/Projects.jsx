import { Box, Button, colors, Paper, Stack, Typography } from '@mui/material';

import { Link } from 'react-router';

import SidebarLayout from '@/components/layouts/SidebarLayout';
import { useEffect, useState, useContext } from 'react';
import services from '@/services';
import Table from '@/components/ui/Table';
import datetime from '@/utils/datetime';
import TextField from '@/components/ui/Forms/TextField';
import { useForm, useWatch } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import Pagination from '@/components/ui/Pagination';
import ModalAddNewProject from './Modals/ModalAddNewProject';
import { useSnackbar } from '@/components/ui/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const Projects = () => {
  const [isLoading, setLoading] = useState(false);
  const [boardsData, setBoardsData] = useState([]);
  const [boardsMeta, setBoardsMeta] = useState({});
  const [page, setPage] = useState(1);

  const { toggleSnackbar } = useSnackbar();

  const [openModalAddNewProject, setOpenModalAddNewProject] = useState(false);

  const { control } = useForm({
    defaultValues: {
      search: '',
    },
  });

  const watchSearch = useWatch({
    control,
    name: 'search',
  });

  const [debounceSearch] = useDebounce(watchSearch, 1000);

  const fetchBoardsData = async () => {
    setLoading(true);
    const response = await services.boards.myBoards({
      filter: debounceSearch,
      limit: 10,
      page,
    });
    setBoardsData(response.data.data);
    setBoardsMeta(response.data.meta);
    setLoading(false);
  };

  const handleDeleteBoard = async (boardID) => {
  const confirmDelete = window.confirm(
    'Yakin ingin menghapus proyek ini?'
  );

  if (!confirmDelete) return;

  try {
    await services.boards.delete(boardID);

    toggleSnackbar(true, 'Board berhasil dihapus');

    fetchBoardsData();
  } catch (error) {
    toggleSnackbar(true, 'Gagal menghapus board');
  }
};

  useEffect(() => {
    fetchBoardsData();
  }, [debounceSearch, page]);

  const handleOpenAddNewProject = () => setOpenModalAddNewProject(true);
  const handleCloseAddNewProject = async () => {
    await fetchBoardsData();
    setOpenModalAddNewProject(false);
  };

  return (
    <>
      <SidebarLayout
        pageTitle="Daftar Proyek"
        breadcrumbs={[
          {
            label: 'Daftar Proyek',
          },
        ]}
      >
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Box>
            <TextField
              control={control}
              label={'Cari nama proyek'}
              id="search"
              name="search"
              size="small"
            />
          </Box>
          <Box>
            <Button
              type="button"
              variant="contained"
              onClick={handleOpenAddNewProject}
            >
              Buat proyek baru
            </Button>
          </Box>
        </Stack>

        <Table
          isLoading={isLoading}
          data={boardsData}
          columns={[
            {
              id: 'title',
              label: 'Nama proyek',
            },
            {
              id: 'description',
              label: 'Deskripsi',
            },
            {
              id: 'title',
              label: 'Tanggal dibuat',
              render(data) {
                return (
                  <Box>{datetime.format(data.created_at, 'DD-MMM-YYYY')}</Box>
                );
              },
            },
            {
              id: 'title',
              label: 'Aksi',
              render(data) {
                return (
                  <Stack direction="row" spacing={1}>
                    <Link to={`/projects/${data.public_id}`}>
                      <Button type="button" variant="outlined">
                          Detail proyek
                      </Button>
                    </Link>

                    <IconButton
                       color="error"
                       onClick={() => handleDeleteBoard(data.public_id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
    
                );
              },
            },
          ]}
        />
        <Pagination
          count={boardsMeta.total_pages}
          onChange={(e, page) => {
            setPage(page);
          }}
        />
      </SidebarLayout>
      <ModalAddNewProject
        open={openModalAddNewProject}
        handleClose={handleCloseAddNewProject}
      />
    </>
  );
};

export default Projects;
