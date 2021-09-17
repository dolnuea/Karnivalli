import styled from "styled-components";


export const PlayAgainScreen = styled.div `
    height: 100vh;
    width: 100%;
    background-color: whitesmoke;
    display: flex;
`;


export const PlayAgainWinLose = styled.div `
    display: flex;
    color: whitesmoke;
    border: lightseagreen 10px solid;
    height: 500px;
    width: 600px;
    background-color: lightskyblue;
    border-top-right-radius: 7em;
    border-bottom-left-radius: 7em;

    &:hover{
        background-color: red;
    }
`;


export const ReplayGameBox = styled.div `
    display: flex;
    color: whitesmoke;
    border: lightseagreen 10px solid;
    height: 300px;
    width: 300px;
    border-top-left-radius: 7em;
    border-bottom-right-radius: 7em;
    background-color: lightslategray;

    &:hover{
        background-color: coral;
    }
`;