
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {area,category} from "./filtersItems"
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
const drawerBleeding=56;
const FilterPanel=({open,setfilterPanel,filters,setFilter})=>{
  
  const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));
  const HandleChange=(e)=>{
    setFilter({
      ...filters,
      [e.target.name]:e.target.value
    })
  }
  const toggleDrawer = (newOpen) => () => {
    setfilterPanel(newOpen);
  };
    return <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: 'text.primary' }}>Filter Shops</Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
        
        
        
      <FormControl fullWidth>
        <InputLabel id="Area">Area</InputLabel>
        <Select
          labelId="Area"
          id="AreaSelect"
          name="area"
          onChange={HandleChange}
          label="Age"
          value={filters.area}
        >
          <MenuItem value={""}>All</MenuItem>
         {area.map((item,key)=>{
         return <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
         })}
        </Select>
      </FormControl>        
      <FormControl fullWidth>
        <InputLabel id="Category">Category</InputLabel>
        <Select
          labelId="Category"
          id="categorySelect"
          name="category"
          label="category"
          value={filters.category}
          onChange={HandleChange}
        >
          <MenuItem value={""}>All</MenuItem>
         {category.map((item,key)=>{
         return <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
         })}
        </Select>
      </FormControl>
     
   </StyledBox>
      </SwipeableDrawer>
}
export default FilterPanel;