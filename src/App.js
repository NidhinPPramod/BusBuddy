import './App.css';
import UserForm from './components/UserForm/UserForm';
import GoogleAuth from "./Firebase/auth"
import {auth} from "./Firebase/config"
import {useEffect,useState} from 'react'

function App() {
  const [user, setUser] = useState(null);

  
 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is authenticated
        setUser(user);
      } else {
        // User is not authenticated
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const signOut=()=>{
    localStorage.clear()
    auth.signOut()
  }


  return (
   <div>
      {user ? (
        <p>Welcome, <br/><UserForm/><br/>
        <button onClick={signOut}>Google Sign Out</button></p>
      ) : (
        <p>Please sign in<br/><GoogleAuth/></p>
      )}
    </div>
  );
}

export default App;
