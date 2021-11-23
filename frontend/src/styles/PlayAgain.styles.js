import styled from "styled-components";


export const PlayAgainScreen = styled.div `
    height: 100vh;
    width: 100%;
    display: flex;
`;


export const PlayAgainWinLose = styled.div `
    display: flex;
    color: whitesmoke;
    border: #7C40A9 10px solid;
    height: 500px;
    width: 600px;
    background-color: #693699;
    border-top-right-radius: 7em;
    border-bottom-left-radius: 7em;
    transition-property: transform, background-color, color;
    transition-duration: .3s;
    transition-timing-function: cubic-bezier(0.37, 0, 0.63, 1);

    &:hover{
        background-color: #ff124f;
    }
`;


export const ReplayGameBox = styled.div `
    display: flex;
    color: whitesmoke;
    border: #7C40A9 10px solid;
    height: 300px;
    width: 300px;
    border-top-left-radius: 7em;
    border-bottom-right-radius: 7em;
    background-color: #9570DD;
    transition-property: transform, background-color, color;
    transition-duration: .3s;
    transition-timing-function: cubic-bezier(0.37, 0, 0.63, 1);

    &:hover{
        background-color: #fe75fe;
    }
`;