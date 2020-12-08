import React, {useState, useEffect} from 'react';
//import {Link} from 'react-router-dom';
import './App.style.scss';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import SignIN from '../src/SignIN/Signin.component';
import SignUP from '../src/SignUP/Signup.component';
import Header from './header/Header.component';
import Take from './Take/Take.component';
import Mylist from '../src/Mylist/Mylist.component';


import {useStateValue} from '../src/StateProvider';
import {auth,db} from '../src/firebase';



function App() {

  const [user, setUser] = useState(null);
  const [myList, setList]= useState([]);

  const [,dispatch] = useStateValue();
  
  useEffect(()=>{
    const unsubsribe= auth.onAuthStateChanged((authUser)=>{
      
      if(authUser){
        setUser(authUser);
        dispatch({ 
          type:"SET_CURRENT_USER",
          user:authUser,
          
      });   
      }
      else{
        setUser(null);
      }
      return()=>{
        unsubsribe();
      };
    });
  },[user,dispatch]);

  useEffect(()=>{
    if(user){
      db.collection('users').doc(user.uid)?.collection('orders').orderBy('Quantity','desc')
      .onSnapshot((snapshot)=>(
         setList(snapshot.docs?.map((doc)=>(
            {
              id:doc.id,
              order:doc.data()
            }
          )
          
      ))))
    }
    
  },[user]);

  

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <div className='main'>
              <div className='Top'>
                <div>
                  <Header user={user}/>
                </div>
                <div className='center'>
                {
                  user?.displayName? 
                  <h4>Hello : {user?.displayName}</h4>
                  :''
                }
                </div>
                <div>
                  <Take  uid={user?.uid}/>
                </div>
                {
                  (myList.length > 0 && user?.displayName) ? <div className='row'>
                  <div>
                      Quantity
                  </div>
                  <div>
                      Product
                  </div>
                  <div>
                      Action
                  </div>
              </div> :
              ''
                }
                
              </div>
             <div className='mainList'>
               {
                 user?.displayName? 
                 myList?.map((td)=>(
                  <Mylist key={td.id} list={td} />
                 ))
                 :
                 ''
               }
              
             </div>

              
            </div>
            
          </Route>
          <Route path='/SignIN'>
            <SignIN/>
          </Route>
          <Route path= '/SignUP'>
            <SignUP/>
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
