import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {MdDelete} from "react-icons/md";
import {useHistory} from "react-router-dom";



const ItemList = () =>{
    
    const history = useHistory();
    const [data, setData] = useState([]);
console.log("OnLoad", data);
console.log(data.length)
        useEffect(()=>{
        fetch("/myposts",{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log("GET fetch",result);
            history.push("/profile");
            setData(result.posts);
        })
    },[]);

    const deleteItem = (postId) =>{
        console.log("Post ID", postId)
        console.log("Delete Process On...");
        
        fetch(`/deleteitem/${postId}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log("RESULTS ",result);
            const newData = data.filter(item=>{
                setData(newData)
                return item._id !== result._id
            })
        })
    }

console.log("User to buy list",data);
if(data.length === 0) {
    return(<>
    <H2>Your List is empty</H2>
    </>)
}
else return(<>
    <H2>Got it</H2>
    <Wrapper>
    
    {data.map(item=>{
        return(
            <>
            <Item key={item.key}>
        {item.item}
        <Delete
        onClick={()=>{
            deleteItem(item._id);
            window.location.reload()
        }
            }
            >
        <Trash />
         </Delete>
        </Item>
        </>
        )
    })}
    </Wrapper>
    </>)
}

export default ItemList;
//{textDecoration: checked?'line-through':'none'}

const H2 = styled.h2`
font-size:35px;

margin:20px;
color:#FC4445;
font-family: 'Oleo Script', cursive;
`;
const Wrapper = styled.div`
display:flex;
justify-content:center;
flex-direction:column;
align-items:center;
padding:5px;
margin:55px;
width:600px;
background-color: #fafafa;
  border: 3px solid;
  border-image-source: linear-gradient(45deg, #ffb442,#d40fb3);
  border-image-slice: 1;

  @media(max-width: 700px){
    width:300px;
}
`;

const Item = styled.div`
color:#FC4445;
font-weight:bold;
margin:8px;
display:flex;
justify-content:center;
align-items:center;
width:250px;
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  :hover{
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
cursor: pointer;

@media(max-width: 700px){
    width:200px;
}

`;

const Delete = styled.button`
display:flex;
justify-content:center;
align-items:center;
height:35px;
width: 55px;
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
  outline: none;
`;

const Trash = styled(MdDelete)`
color:#d40fb3;
`;