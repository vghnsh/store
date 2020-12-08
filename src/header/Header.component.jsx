import React from 'react';
import {Link} from 'react-router-dom';
import './Header.style.scss';
import {auth} from '../firebase';

import {useStateValue} from '../StateProvider';


function Header() {
    const [{user}] = useStateValue();
    const [,dispatch] = useStateValue();



const signOut=(event)=>{
    event.preventDefault();
    auth.signOut();
    dispatch({
        type:"SET_CURRENT_USER",
        user:null,  
    });  
};

return (
        <div className='header'>
            <div className='todoAPP'>
                <h1> Welcome to Store </h1>
            </div>
            {
                user ? 
                <div className="nav"> 
                    <div className='logout  link'>
                    <h3 onClick={signOut}>Logout</h3>
                    </div>
                </div> 
                :          
                <div className="nav"> 
                    <div className='login-sign center'>
                        <div className='signIn pad '>
                        <Link className='link' to='/SignIN'> <h3>Login</h3></Link>
                        </div>
                        
                        <div className='signUp1 pad link'>
                        <Link className='link' to='/SignUP'> <h3>SignUp</h3></Link>
                        </div> 
                    </div>
                    <div className='note center'>
                        <h5>
                            Kindly LogIn and Use
                        </h5>
                    </div> 
                </div>
            }      
        </div>  
      
    )
}

export default Header;
