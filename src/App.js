
import {useState,useEffect} from "react";

import {Stack,Paper,IconButton,Chip,Box,Fab, Typography} from "@mui/material";
import { styled } from '@mui/material/styles';
import AppBarComponent from "./app/AppBar.component"
import ShopForm from "./app/shopForm.component"
import FilterPanel from "./app/filterPanel.component"
import AddIcon from "@mui/icons-material/Add";
import ShopCard from "./app/ShopCard.component"
import { useSelector, useDispatch } from 'react-redux'
import {
  AddShop,
} from './app/feature/shopReducer';
import SettingsInputComponentTwoToneIcon from '@mui/icons-material/SettingsInputComponentTwoTone';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
    const [open, setOpen] = useState(false);
    const [filters, setFilter] = useState({
      area:"",
      category:"",
    });
    const [filterPanelOpen, setfilterOpen] = useState(false);
    const [ShoplistData, setShoplist] = useState([]);
   const shoplist = useSelector((state) => state.shoplist.value)
   
   const dispatch = useDispatch()
  useEffect(()=>{
    setShoplist(shoplist)
   
  },[shoplist,setShoplist])
  const Submit=(data)=>{
    setOpen(false)
    dispatch(AddShop(data))
  }
  const FilterData=({type,val})=>{
    if(type && val){
      setShoplist(shoplist.filter((item)=>{
        return item[type]===val
      }))
    }
    else{
      return setShoplist(shoplist)
    }
    
  }
 
  const StyledFab = styled(Fab)({
  position: 'fixed',
  zIndex: 1,
  bottom: 40,
  left: 0,
  right: 30,
  margin:'auto 0 auto auto',
});
  return (
    <div className="App">
        <Box component="div">
          <AppBarComponent/>
          <Typography variant="h4">shoplist</Typography>
          
          <Stack direction="row" spacing={1}>
            <IconButton onClick={()=>setfilterOpen(true)}><SettingsInputComponentTwoToneIcon/></IconButton>
            {Object.keys(filters).map((item,i)=>{
                  return <Chip key={i} label={`${item}:${filters[item]}`} onClick={()=>FilterData({type:item,val:filters[item]})} />
            })}
          </Stack>
          <FilterPanel filters={filters} setFilter={(e)=>setFilter(e)} open={filterPanelOpen} setfilterPanel={(e)=>setfilterOpen(e)}/>
         <Paper className="d-flex flex-wrap" sx={{height:"calc(100vh-100)"}}>
         {ShoplistData.map((item,i)=>{
           return <ShopCard key={item.id} item={item} />
         })}
         </Paper>
          
          
          <ShopForm open={open} toggle={(e)=>setOpen(e)} submit={(e)=>Submit(e)}/>
          <StyledFab color="secondary" aria-label="add" onClick={()=>setOpen(!open)}>
            <AddIcon />
          </StyledFab>
        </Box>

    </div>
  );
}

export default App;
