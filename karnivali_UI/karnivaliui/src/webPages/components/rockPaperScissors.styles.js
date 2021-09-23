import styled from "styled-components";

export const RockPaperScissorBackground = styled.div ` 
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: whitesmoke;
`;

export const Slot = styled.button ` 
    height: 400px;
    width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 80% / 30%;

`;

export const Rock = styled.div ` 
    font-size: 80px;

`;


export const Paper = styled.div ` 
    font-size: 80px;

`;


export const Scissor = styled.div ` 
    font-size: 80px;

`;