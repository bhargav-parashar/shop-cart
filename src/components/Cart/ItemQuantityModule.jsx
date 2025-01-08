import { IconButton, Stack, Box } from "@mui/material";
import { AddOutlined, RemoveOutlined } from "@mui/icons-material";

const ItemQuantityModule = ({ value, handleAdd, handleDelete, isReadOnly }) => {
    if(isReadOnly){
      return (
        <Box>
        <p>
          Qty: <b>{value}</b>
        </p>
      </Box>
      )
    }
    return (
      <Stack direction="row" alignItems="center" >
        <IconButton size="small" color="primary" onClick={handleDelete}>
          <RemoveOutlined />
        </IconButton>
        <Box padding="0.5rem" data-testid="item-qty">
          {value}
        </Box>
        <IconButton size="small" color="primary" onClick={handleAdd}>
          <AddOutlined />
        </IconButton>
      </Stack>
    );
  };

export default ItemQuantityModule;