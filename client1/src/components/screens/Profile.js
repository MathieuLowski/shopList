import React, {useState} from "react"
import styled from "styled-components";
import ItemForm from "../screens/homepagecomps/ItemForm"
import ItemList from "../screens/homepagecomps/ItemList"

const Profile = ()=>{

    return(<>
    <Wrapper>
    <H1>To get:</H1>
    <ItemForm/>
    <ItemList/>
    </Wrapper>
    </>)
}

export default Profile;

const H1 = styled.h1`
font-size:30px;
margin:20px;
color:#FC4445;
font-family: 'Oleo Script', cursive;
`;

const Wrapper = styled.div`
width:100%;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
background-color:#3FEEE6;


`;

