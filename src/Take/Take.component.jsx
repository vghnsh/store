import React, {useState,useEffect} from 'react';
import './Take.style.scss';

import {TextField ,Button,MenuItem,Select} from '@material-ui/core';

import {db} from '../firebase';


import {useStateValue} from '../StateProvider';



function Take({uid}) {
    const [{update,id}] = useStateValue();
    const [,dispatch] = useStateValue();


    const [take, setTake]= useState('');
    
    const [Qun,setQun] = useState(1);
    
    useEffect(()=>{
        if(update){
            setQun(update.Quantity);
            setTake(update.order);
        }    
    },[update]);

    const handleChange = (e)=>{
        setQun(e.target.value);
        
    };

    const handleAdd = (e)=>{  
        e.preventDefault(); 
        db.collection('users').doc(uid).collection('orders').add({
          order: take,
          Quantity : Qun,
        });
        setTake('');
    };

    const handleUpdate=(e)=>{
        e.preventDefault();
        db.collection('users').doc(uid).collection('orders').doc(id)
        .set({
            order: take,
            Quantity: Qun,
        });
        dispatch({
            type:"SET_EDIT", 
            update:null,
            id:null
        })
        setTake('');
   

    }
    
    return (
        <div className='todoMain'>
            
            <div>
                <TextField
                    className='todo'
                    id="outlined-secondary"
                    label="Add Your Product"
                    variant="outlined"
                    color="primary"
                    value={take}
                    onChange={(e)=>setTake(e.target.value)}
                />
            </div>
            <div className='pri'>
                <div className='pri_title'>
                Quantity
                </div>
                <div className='select'>
                    <Select 
                    className='Uselect'
                    value= {Qun}
                    displayEmpty
                    onChange={handleChange}>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                    </Select>

                </div>
                
            </div>
            <div>
                {
                    update ?
                    <Button disabled={!(uid && take)} className='todoBTN' 
                
                    onClick={handleUpdate}>
                        <b>Update</b>
                    </Button>:
                     <Button disabled={!(uid && take)} className='todoBTN' 
                
                     onClick={handleAdd}>
                         <b>Add</b>
                     </Button>

                }
               
            </div>

            
        </div>
    )
}

export default Take;
