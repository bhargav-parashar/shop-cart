import React, { useState } from "react";
import { Box} from "@mui/system";
import { ProductsGrid } from "../../components/Grid/Grid.jsx";
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  //HANDLE SELECTION CHANGE
  const handleSelectionChange = (newSelection) => {
    const selectedRowId = newSelection[0];
    setSelectedId(selectedRowId);
    navigate(`/details?id=${selectedRowId}&page=${Number(page)+1+''}`)
  };

  //HANDLE PAGE CHANGE
  const handlePageChange = (newpage) => {
    setPage(newpage)
  };

  return (
    <Box sx={{ bgcolor: "white", height: "90vh", padding: "none" }}>
      <ProductsGrid
        selectedId={selectedId}
        handleSelectionChange={handleSelectionChange}
        page={page}
        setPage={handlePageChange}
      />
    </Box>
  );
};

export default HomePage;
