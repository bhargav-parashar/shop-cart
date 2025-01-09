
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Dropdown({categoryList,selectedValue, handleFilterChange, label}) {
  


  //REMOVE DUPLICATE CATEGORY FROM ARRAY
  const removeDuplicates = (array) =>{
    return [...new Set(array)];
  }

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id={label}>{label}</InputLabel>
        <Select
          name={label}
          labelId={label}
          id={label}
          value={selectedValue}
          label={label}
          onChange={handleFilterChange}
        
        >
          <MenuItem value="">
            <em>All Categories</em>
          </MenuItem>
          {
            removeDuplicates(categoryList).map((item,idx)=><MenuItem key={idx} value={item}>{item}</MenuItem>)
          }
          
        </Select>
        
        
      </FormControl>
    
    </div>
  );
}