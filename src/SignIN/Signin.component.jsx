import React, { useState } from 'react';
import './Signin.style.scss';
import {TextField ,Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import firebase from 'firebase';
import {auth} from '../firebase';

function Signin() {
    const [mail, setMail]= useState('');
    const [password, setPassword]= useState('');
    const history = useHistory();

   
    
    
    const signInWithGoogle = () => {
        const provider =new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({propmt:'select_account'});
        auth.signInWithPopup(provider)
          .then(() => {
            history.push("/");
          });
          
      };

      const signIn=(event)=>{
        event.preventDefault();
        
        auth.signInWithEmailAndPassword(mail,password)
        .then(auth=>{history.push("/")})
        .catch((error)=>alert(error.message));
        setMail('');
        setPassword('');
        
        
      };

      
   
    return (
        <div className='signin'>
            <div>
            <h1 className='title'>SignIN</h1>
            </div>
            
            <div className='signDiv'>
            <Button onClick={signInWithGoogle} className='GoogleSign'>
                <b>Sign In with Google (Recommanded)</b>
            </Button>

            <p className='center'>or</p>
    
            <form className='signForm' noValidate autoComplete="off">
                <TextField
                    className='mail'
                    id="outlined-secondary"
                    label="E-mail"
                    variant="outlined"
                    color="primary"
                    value={mail}
                    onChange={(e)=>setMail(e.target.value)}
                />
                
                <TextField
                    className='password'
                    type='password'
                    id="outlined-secondary"
                    label="Password"
                    variant="outlined"
                    color="primary"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
            
           
            </form>
            <Button onClick={signIn}  className='signBTN'>
                <b>Sign In </b>
            </Button>
            
           
            <Link className='link' to='/SignUP'>
               Go to SignUP 
            </Link>
            
            
            </div>
            
        </div>
    )
}

export default Signin;
