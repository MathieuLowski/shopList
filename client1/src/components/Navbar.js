import React, {useContext, useState} from "react";
import {Link, useHistory, NavLink} from "react-router-dom";
import {UserContext} from "../App";
import styled from "styled-components";

const Navbar = ()=>{

  const {state, dispatch} = useContext(UserContext);
  const history = useHistory()
  const [open, setOpen] = useState(false);

  const renderList = () =>{
    if(state){
      return(
        <>
        <LoggerWrapper>
        <SuperLink to="/profile" activeClassName="selected" >
        <Button>
          Profile
        </Button>
        </SuperLink>
        
        <Button onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push("/signin")
         
          }}
          >
          Logout
          </Button>
         
          </LoggerWrapper>
          <StyledBurger open={open} onClick={() => setOpen(!open)}>
          <div />
          <div />
          <div />
        </StyledBurger>

        <Menu  open={open}>
        <MenuLink to="/profile" activeClassName="selected" onClick={() => setOpen(!open)}>
        <Button>
          Profile
        </Button>
        </MenuLink>
        <Button onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push("/signin")
          setOpen(!open)
          }}
          >
          Logout
          </Button>

        </Menu>
          </>
      )
    }else{
      return(
      <>
      <LoggerWrapper>
      <SuperLink to="/signin" activeClassName="selected" ><Button>Login</Button></SuperLink>
        <SuperLink to="/signup" activeClassName="selected"><Button>Signup</Button></SuperLink>
        </LoggerWrapper>
        <StyledBurger open={open} onClick={() => setOpen(!open)}>
          <div />
          <div />
          <div />
        </StyledBurger>

        <Menu  open={open}>
        <MenuLink to="/signin" activeClassName="selected" onClick={() => setOpen(!open)}><Button>Login</Button></MenuLink>
        <MenuLink to="/signup" activeClassName="selected" onClick={() => setOpen(!open)}><Button>Signup</Button></MenuLink>
        </Menu>
        </>
        )
        
      
    }
  }
    return(
        <> 
        <Wrapper>
          
          <CornerLink to="/" className="brand-logo left">Don't forget</CornerLink>
          
          {renderList()}
      </Wrapper>
      </>
    )
}

export default Navbar;

const activeClassName = 'nav-item-active'

const SuperLink = styled(NavLink).attrs({ activeClassName })`
  &.${activeClassName} {
    border-bottom: 5px solid;
  border-radius: 5px;
  border-image-source: linear-gradient(45deg, #ffb442,#d40fb3);
  border-image-slice: 1;
  }
`;
const Button = styled.button`
font-family: 'Oleo Script', cursive;
height:50px;
font-size:22px;
cursor: pointer;
border: none;
background-color: #fafafa;
background: linear-gradient(to right, #ffb442 0%, #d40fb3 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	font: {
		size: 20vw;
		family: $font;
	};
  border-radius: 5px;
  width: 80px;
  outline: none;

`;
const Wrapper = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
flex-direction:row;
height:100px;
`;

const CornerLink = styled(Link)`
font-family: 'Oleo Script', cursive;
margin-left:15px;
font-size:35px;
	background: linear-gradient(to right, #ffb442 0%, #d40fb3 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	font: {
		size: 20vw;
		family: $font;
	};
`;

const LoggerWrapper = styled.div`
display:flex;
justify-content:space-between;
margin: 15px;
width:200px;
@media(max-width:769px){
  display:none;
}
`;

const StyledBurger = styled.div`
  padding-right:20px;
  padding-left: 30px;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;
  @media (min-width: 769px) {
    display: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? "#ffb442" : " #d40fb3")};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-child(1) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    &:nth-child(2) {
      transform: ${({ open }) =>
      open ? "translateX(-100%)" : "translateX(0)"};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

const Menu = styled.div`
display:none;
@media (max-width: 769px) {
    position:absolute;
    display: flex;
    justify-content:center;
    align-items:flex-start;
    flex-direction:column;
    width:100vw;
    height:170px;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-300%)")};
    transition: all 0.3s ease-in;
    margin-top:230px;
    background-color:white;
    }
`;

const MenuLink = styled(NavLink).attrs({ activeClassName })`
  &.${activeClassName} {
    border-bottom: 5px solid;
  border-radius: 5px;
  border-image-source: linear-gradient(45deg, #ffb442,#d40fb3);
  border-image-slice: 1;
  width:100vw; //not sure how I want to style that line yet.
  }
`;