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
    border: none;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 230, 239, 0.6);
    transition-property: transform, background-color, color, border-radius;
    transition-duration: .3s;
    transition-timing-function: cubic-bezier(0.37, 0, 0.63, 1);

    &:hover{
        background-color: #ff124f;
        border-radius: 30em;
    }
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

