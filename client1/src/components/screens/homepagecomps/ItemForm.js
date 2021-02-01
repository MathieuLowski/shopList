import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import M from "materialize-css";
import styled from 'styled-components';

const  ItemForm =()=> {

    const [item, setItem] = useState("");
    const history = useHistory();

    const add = ()=>{
 
        fetch("/createpost",{
            method:"post",
            headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
            },     
            body:JSON.stringify({
                item
            })
            }).then(res=>res.json())
            .then((data)=>{
                console.log(data)
                if(data.error){
                    M.toast({html:"ERROR",
                    classes:"#ff1744 red accent-3"})
                }
                else{
                    M.toast({html:"Successfully added",
                     classes:"#76ff03 light-green accent-3"});
                     history.push("/profile");
                
                }
            })
    };
    
    return (
        <Wrapper>
            <Form 
            onSubmit={(ev)=>{
            ev.preventDefault();
            add();
            setItem("");
            }}>
            <Input
            placeholder="Add Item"
            value={item}
            onChange={(ev)=>{
                setItem(ev.target.value)
            }}/>
            <Button
            type="submit"
            // onClick={() => window.location.reload(false)}
            >Add
            </Button>
            </Form>
        </Wrapper>
    )
}

export default ItemForm;

const Wrapper = styled.div`
display:flex;
justify-content:center;
align-items:center;
margin:55px;
`;
const Form = styled.form`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;

`;
const Input = styled.input`
height:30px;
width:250px;
border-radius:45px;
font-size:18px;
 padding: 5px;
  margin: 15px;
  border:none;
  outline:none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  :hover{
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
`;
const Button = styled.button`
height:55px;
font-size:18px;
  margin: 15px;
  background: linear-gradient(to right, #ffb442 0%, #d40fb3 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	font: {
		size: 20vw;
		family: $font;
	};
  cursor: pointer;
  padding: 10px;
  border: none;
  background-color: #FaFaFa;
  border: 3px solid;
  border-image-source: linear-gradient(45deg, #ffb442,#d40fb3);
  border-image-slice: 1;
  font-weight: 600;
  border-radius: 5px;
  width: 200px;
  outline: none;
`;