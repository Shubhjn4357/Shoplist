import {Menu,Divider,Avatar,MenuItem,Stack,IconButton,Card,CardHeader,CardActionArea,CardContent, Typography} from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useState} from "react";
import { useDispatch } from 'react-redux'

import {
 DeleteShop,
 EditShop
} from './feature/shopReducer';

const ShopCard=({item})=>{
  
    const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const HandleOption=(type)=>{
   dispatch(type(item.id));
    setAnchorEl(null);
  }
  const options=[
      {name:"Delete",func:DeleteShop},
      {name:"Edit",func:EditShop},
    ]
  return  <Card sx={{width:300,m:1}}>
  <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map((option,i) => (
          <MenuItem key={i} onClick={()=>HandleOption(option.func)}>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
           <CardHeader avatar={<Avatar variant="circular"/>}
                       title={<Typography variant="h6">{item.name}</Typography>}
                       action={<IconButton  aria-label="more"
                                            id={item.id}
                                            aria-controls={open ? 'long-menu' : undefined}
                                            aria-expanded={open ? 'true' : undefined}
                                            aria-haspopup="true"
                                            sx={{ms:"auto"}}
                                            onClick={handleClick}
                                    >
                                  <MoreVertIcon />
                                </IconButton>}
                       subheader={<Typography sx={{color:'text.secondary'}} variant="p"> {item.area}</Typography>
}
                   />
           <Divider/>
           <CardActionArea>
           <CardContent>
           <Stack direction="column" spacing={1}>
            <Typography variant="p">{item.category}</Typography>
            <Typography variant="p">Opening {item.opening}</Typography>
            <Typography variant="p">Opening {item.closing}</Typography>
           </Stack>
           </CardContent>
           </CardActionArea>
           </Card>
}
export default ShopCard