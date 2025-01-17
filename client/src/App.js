import React, {useEffect, createContext, useReducer, useContext} from "react"
import Navbar from "./components/Navbar";
import "./App.css";
import {BrowserRouter, Route, Switch, useHistory} from "react-router-dom";
import Home from "./components/screens/Home";
import Signin from "./components/screens/Signin";
import Signup from "./components/screens/Signup";
import Profile from "./components/screens/Profile";
import {reducer, initialState} from "./reducers/userReducer";
import GobalStyles from "./components/GlobalStyles";
import GlobalStyles from "./components/GlobalStyles";

export const UserContext = createContext();

const Routing = () =>{

  const history = useHistory();
  const {state, dispatch} = useContext(UserContext);

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      dispatch({type:"USER", payload:user})
      //history.push("/")
    }else{
      history.push("/signup");
    }
  },[])

   return(
<>
<Switch>
<Route exact path="/">
 
<Home/>
</Route>
<Route path="/signup">
<Signup/>
</Route>
<Route path="/signin">
<Signin/>
</Route>
<Route path="/profile">
<Profile/>
</Route>
</Switch>
</>
   )
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{state, dispatch}}>
       <GlobalStyles/>
    <BrowserRouter>
    <Navbar/>
    <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
