import styled from "styled-components";

export const RockPaperScissorBackground = styled.div ` 
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export const Slot = styled.button ` 
    height: 400px;
    width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
   
    background-color: rgb(255, 230, 239, 0.6);
   
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