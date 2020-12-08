import React from 'react';
import './Mylist.style.scss';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {db} from '../firebase';

import {useStateValue} from '../StateProvider';

function Mylist({list}) {

    const [{user}] = useStateValue();
    const [,dispatch] = useStateValue();

    const edit=(e)=>{
        dispatch({
            type:"SET_EDIT", 
            update:list.order,
            id:list.id
        })
    };

    const deleteme=(e)=>{
        db.collection('users').doc(user.uid).collection('orders').doc(list.id).delete()
    };

    
    return (
        <div className={'mylist center' +(
            list.order.Quantity > 5 ? ' high' : '' ||
            list.order.Quantity > 2 ? ' Med' : '' ||
            list.order.Quantity > 0 ? ' Low' : ''
        )} >
            <div className='task '>
                { list.order.Quantity}
                
            </div>
            <div className='pri'>
                {list.order.order}
            </div>

            <div className='icons'>
                <div className='icon'>
                    <EditIcon onClick={edit}>

                    </EditIcon>
                    </div>
                    <div className="icon">
                    <DeleteIcon 
                        onClick={deleteme} 
                        variant="contained" >Delete Me
                    </DeleteIcon>                
                    </div>
            </div>
               

            </div>
    )
}

export default Mylist;
