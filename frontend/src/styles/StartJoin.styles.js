import styled from 'styled-components';

export const StartJoinScreen = styled.div`

    display: flex;
    justify-content: center;
    height: 100vh;
`

export const GameboxStart = styled.div`
    height: 150px;
    width: 400px;
    background-color: rgb(246, 220, 212, 0.7);
    
    border-top-right-radius: 0px;
    border-bottom-left-radius: 0px;
    color: rgb(107, 234, 52);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 200px;
    transition-property: transform, background-color, color, border-radius;
    transition-duration: .3s;
    transition-timing-function: cubic-bezier(0.37, 0, 0.63, 1);

    &:hover{
        background-color: #fe75fe;
        transform: scale(1.1);

        animation: pulse 1s;
        animation-iteration-count: infinite;

        @keyframes pulse {
            0% {border-radius: 0em; opacity: 1;}
            50% {border-radius: 2em; opacity: 0.7;}
            100% {border-radius: 0em; opacity: 1;}
        }
    }
`;

export const GameboxJoin = styled.div`
    height: 150px;
    width: 400px;
    background-color: rgb(246, 220, 212, 0.7);
    
    border-top-right-radius: 0px;
    border-bottom-left-radius: 0px;
    color: rgb(255, 195, 15, );
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 200px;
    transition-property: transform, background-color, color, border-radius;
    transition-duration: .3s;
    transition-timing-function: cubic-bezier(0.37, 0, 0.63, 1);

    &:hover{
        background-color: #ff124f;
        transform: scale(1.1);

        animation: pulse 1s;
        animation-iteration-count: infinite;

        @keyframes pulse {
            0% {border-radius: 0em; opacity: 1;}
            50% {border-radius: 2em; opacity: 0.7;}
            100% {border-radius: 0em; opacity: 1;}
        }
    }
`;

export const GameboxWatch = styled.div`
    height: 150px;
    width: 400px;
    background-color: rgb(246, 220, 212, 0.7);
    
    border-top-right-radius: 0px;
    border-bottom-left-radius: 0px;
    color: rgb(107, 234, 52);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 200px;
    transition-property: transform, background-color, color, border-radius;
    transition-duration: .3s;
    transition-timing-function: cubic-bezier(0.37, 0, 0.63, 1);

    &:hover{
        background-color: #ff00a0;
        transform: scale(1.1);

        animation: pulse 1s;
        animation-iteration-count: infinite;

        @keyframes pulse {
            0% {border-radius: 0em; opacity: 1;}
            50% {border-radius: 2em; opacity: 0.7;}
            100% {border-radius: 0em; opacity: 1;}
        }
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
    
`;
