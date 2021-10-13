import styled from 'styled-components';

export const StartJoinScreen = styled.div`

    display: flex;
    justify-content: center;
    height: 100vh;
`

export const GameboxStart = styled.div`
    height: 150px;
    width: 500px;
    background-color: rgb(124, 64, 169, 0.7);
    border: rgb(88, 24, 69, 0.7)  10px solid;
    border-top-right-radius: 50px;
    border-bottom-left-radius: 50px;
    color: rgb(255, 195, 15);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 200px;

    &:hover{
        background-color: #C70039;
    }
`;

export const GameboxJoin = styled.div`
    height: 150px;
    width: 500px;
    background-color: rgb(88, 24, 69, 0.7);
    border: rgb(159, 5, 197) 10px solid;
    border-top-right-radius: 50px;
    border-bottom-left-radius: 50px;
    color: rgb(255, 195, 15);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 200px;

    &:hover{
        background-color: #FF5733;
    }
`;

export const RoomModal = styled.div`
    background: rgb(149, 112, 221, 0.7);
    width: 40vw;
    display: flex;
    flex-direction: column;
    color: rgb(68, 19, 143);
    border-radius: 3em;
    input[type=text] {
        border: none;
    }
    /* This modal doesn't work (you can't select anything or go back right now) Need to ask luna how to do it */
`;