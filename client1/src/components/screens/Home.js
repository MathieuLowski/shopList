import React from "react";
import styled from "styled-components";

const Home = ()=>{
    return(<>
    <Wrapper>
    <H1>
    Welcome to Don't forget
    </H1>
    <Intro>
        This is a simple app designed to help you to never forget anything
        on your futur groceries adventures. 
    </Intro>
    <Explain>
        It's really simple. Anytime you think of something you need to get 
        on your next groceries, just go on your list and add it. 
        Once you get to the grocery store, take out your phone go on your list,
        and you will get all of your item displayed so you won't forget anything.
        A simple solution for a happiest life!
    </Explain>
    </Wrapper>
    </>)
}

export default Home;

const Wrapper = styled.div`
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
margin:35px;
font-size:18px;

`;
const H1 = styled.h1`
`;

const Intro = styled.div`
width:600px;
margin:35px;

`;

const Explain = styled.div`

width:600px;
margin:35px;

`;
