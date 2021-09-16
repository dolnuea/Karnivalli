import styled from 'styled-components';

export const StartJoinScreen = styled.div `
    background-color: whitesmoke;
    display: flex;
    justify-content: center;
    height: 100vh;
`

export const GameboxStart = styled.div `
    height: 150px;
    width: 500px;
    background-color: lightblue;
    border: lightskyblue 10px solid;
    border-top-right-radius: 50px;
    border-bottom-left-radius: 50px;
    color: whitesmoke;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 200px;

    &:hover{
        background-color: cadetblue;
    }
`;

export const GameboxJoin = styled.div `
    height: 150px;
    width: 500px;
    background-color: lightblue;
    border: lightskyblue 10px solid;
    border-top-right-radius: 50px;
    border-bottom-left-radius: 50px;
    color: whitesmoke;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 200px;

    &:hover{
        background-color: salmon;
    }
`;