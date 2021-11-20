import styled from "styled-components";

export const RockPaperScissorBackground = styled.div ` 
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: whitesmoke;
`;

export const Slot = styled.div ` 
    height: 400px;
    width: 400px;
    background-color: blue;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 80% / 30%;
`;

export const Rock = styled.div ` 
    height: 80%;
    width: 50%;
    background-color: black;
    border-radius: 9em 12em 4em / 4em 30em;
`;


export const Paper = styled.div ` 
    height: 70%;
    width: 40%;
    background-color: white;
    border-top-right-radius: 10em;
`;


export const Scissor = styled.div ` 
    height: 50%;
    width: 50%;
    background-color: grey;
`;