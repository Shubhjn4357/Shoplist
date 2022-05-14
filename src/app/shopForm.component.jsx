import {useEffect} from "react"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {area,category} from "./filtersItems"
import { useSelector,useDispatch} from 'react-redux'
import * as Yup from 'yup';
import {
   SaveShop
} from './feature/shopReducer';
import { useFormik } from 'formik';


const ValidationSchema = Yup.object().shape({
   name: Yup.string()
     .min(2, 'Too Short!')
     .max(20, 'Too Long!')
     .required('Required'),
   area: Yup.string().required('Required'),
   category: Yup.string().required('Required'),
   opening: Yup.string().required('Required'),
   closing: Yup.string().required('Required'),
 });
 
 
const ShopForm=({open,toggle,submit}) =>{
  const selectedShop = useSelector((state) => state.shoplist.selected)
 const formik = useFormik({
     initialValues: {
          id:Date.now(),
          name:"",
          area:"",
          category:"",
          opening:"",
          closing:""
     },
    validationSchema:ValidationSchema,
     onSubmit: values => {
        if(selectedShop[0]){
          dispatch(SaveShop(formik.values))
        }
        else{
         submit(values) 
        }
       formik.resetForm()
       toggle(false)
     },
   });
  const dispatch=useDispatch()
  useEffect(()=>{
    if(selectedShop[0]){
      toggle(true)
      formik.setValues({...selectedShop[0]});
    }
  },[selectedShop])

  return (
    <div>
      <Dialog open={open} onClose={()=>toggle(false)}>
        <DialogTitle>Add New Shop</DialogTitle>
        <form onSubmit={formik.handleSubmit}> 
        <DialogContent>
          <DialogContentText>
             Add Details About Your Shop
          </DialogContentText>
    
          <TextField
            error={formik.errors.name && formik.touched.name}
            autoFocus
            margin="dense"
            id="name"
            value={formik.values.name}
            label="Name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            helperText={formik.errors.name?formik.errors.name:""}
            required
          />
      <FormControl fullWidth
                   error={formik.errors.area && formik.touched.area}
>
        <InputLabel id="Area">Area</InputLabel>
        <Select
          labelId="Area"
          id="AreaSelect"
          name="area"
          value={formik.values.area}
          label="Area"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
      >
      
        {area.map((item,key)=>{
         return <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
         })}
       </Select>
       {formik.errors.area?<FormHelperText>{formik.errors.area}</FormHelperText>:""}
      </FormControl>
      <FormControl fullWidth
                   error={formik.errors.category && formik.touched.category}
>
        <InputLabel id="Category">Category</InputLabel>
        <Select
          labelId="Category"
          id="categorySelect"
          name="category"
          value={formik.values.category}
          label="Category"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        >
         {category.map((item,key)=>{
         return <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
         })}
       </Select>
   {formik.errors.area?<FormHelperText>{formik.errors.category}</FormHelperText>:""}

      </FormControl>
      {/*------------------------>*/}
      <TextField 
        fullWidth
        error={formik.errors.opening && formik.touched.opening}
        helperText={formik.errors.opening?formik.errors.opening:""}

        type="date"
        value={formik.values.opening}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        name="opening"
        label="Opening Date"
        margin="dense"
        id="opening"
        required
      />
      <TextField 
        fullWidth
        error={formik.errors.closing && formik.touched.closing}
        helperText={formik.errors.closing?formik.errors.closing:""}
        type="date"
        onBlur={formik.handleBlur}
        value={formik.values.closing}
        onChange={formik.handleChange}
        name="closing"
        label="Closing Date"
        margin="dense"
        id="closing"
        required
      />
      
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{toggle(false);formik.resetForm()}}>Cancel</Button>
          <Button disabled={!formik.isValid} type="submit">Submit</Button>
        </DialogActions>
     </form>
      </Dialog>
    </div>
  );
}
export default ShopForm;