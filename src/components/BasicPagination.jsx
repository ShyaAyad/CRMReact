import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination({page, totalPages, handlePagination}) {
  return (
    <Stack spacing={2}>
      <Pagination count={totalPages} page={page} onChange={handlePagination} color="primary" />
    </Stack>
  );
}