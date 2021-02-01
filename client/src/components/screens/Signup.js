import React, {useState} from "react"
import styled from "styled-components";
import {Link, useHistory} from "react-router-dom";
import M from "materialize-css"

const Signup = ()=>{
    const history = useHistory()
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const postData = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Invalid email",
                classes:"#ff1744 red accent-3"});
                return;
        }
        fetch("/signup",{
            method :"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        }).then((res)=>res.json())
        .then((data)=>{
            console.log("Data>", data)
            if(data.error){
                M.toast({html:data.error,
                classes:"#ff1744 red accent-3"})
            }
            else{
                M.toast({html:data.message, classes:"#76ff03 light-green accent-3 "})
                history.push("/signin");
            }
        }).catch(err=>{
            console.log("Error: ", err)
        })
    }

    return(<>
    <Wrapper>
        
        <Form
        onSubmit={(ev)=>{
            ev.preventDefault();
            postData();
        }}
        >
            <H2>Don't forget to create an account</H2>
        <Input 
        type="text"
        placeholder="Name"
        value={name}
        onChange={(ev)=>{
            setName(ev.target.value);
        }}
        />
        <Input 
        type="text"
        placeholder="Email"
        value={email}
        onChange={(ev)=>{
            setEmail(ev.target.value);
        }}
        />
        <Input 
        type="password"
        placeholder="Password"
        value={password}
        onChange={(ev)=>{
            setPassword(ev.target.value)
        }}
        />
        <Button
        type="submit"
       
        >
            Signup
         </Button>
         <H5>
             <Link to="/signin">Already have an account?</Link>
         </H5>
         </Form>
    </Wrapper>
    </>)
}

export default Signup;
const Wrapper = styled.div`
display:flex;
justify-content:center;
align-items:center;
margin:55px;
`;

const H2 = styled.h2`
font-size:35px;
margin:20px;
color:#FC4445;
font-family: 'Oleo Script', cursive;
`;

const Form = styled.form`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
width:500px;
`;
const Input = styled.input`
font-size:18px;
 padding: 5px;
  margin: 15px;
  border:none;
  outline:none;
  border-bottom:black 1px solid;
`;
const Button = styled.button`
height:55px;
font-size:18px;
  margin: 15px;
  cursor: pointer;
  padding: 10px;
  border: none;
  background-color: #FaFaFa;
  background: linear-gradient(to right, #ffb442 0%, #d40fb3 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	font: {
		size: 20vw;
		family: $font;
	};
  font-weight: 600;
  border-radius: 5px;
  width: 200px;
  outline: none;
  transition-property: all;
  transition-duration: 0.2s;
  transition-timing-function: ease-in;
  :hover {
    background-color: #FaFaFa;
    border: 3px solid;
  border-radius: 5px;
  border-image-source: linear-gradient(45deg, #ffb442,#d40fb3);
  border-image-slice: 1;
  }
`;
const H5 = styled.h5``;