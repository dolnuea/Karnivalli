import styled from "styled-components";


export const PlayAgainScreen = styled.div `
    height: 100vh;
    width: 100%;
    display: flex;
`;


export const PlayAgainWinLose = styled.div `
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    color: rgb(255, 195, 15, 0.7);
    background-color: rgb(255, 230, 239, 0.6);
    height: 50%;
    // padding-left: 20px;
    // padding-right: 20px;
    min-width: 500px;

    transition-property: background-color, color, border-radius;
    transition-duration: .3s;


    &:hover{
        background-color: #ff124f;

        animation: pulse 2s;
        animation-iteration-count: infinite;

        @keyframes pulse {
            0% {border-radius: 0em;}
            50% {border-radius: 3em;}
            100% {border-radius: 0em;}
        }
    }

`;


export const ReplayGameBox = styled.div `
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    color: rgb(255, 195, 15, 0.7);
    background-color: rgb(255, 230, 239, 0.6);
    height: 50%;
    // padding-left: 20px;
    // padding-right: 20px;
    min-width: 500px;


    transition-property: background-color, color, border-radius;
    transition-duration: .3s;


    &:hover{
        background-color: #fe75fe;


        animation: pulse 2s;
        animation-iteration-count: infinite;

        @keyframes pulse {
            0% {border-radius: 0em; }
            50% {border-radius: 3em; }
            100% {border-radius: 0em; }
        }
    }
`;

export const ReplayIconSVG = styled.img `

    &:hover{
        animation: rotation 2s infinite linear;

        @keyframes rotation {
                from {
                        transform: rotate(0deg);
                }
                to {
                        transform: rotate(-359deg);
                }
        }
        // animation inspired from: https://codepen.io/vitoralberto/pen/OPYyYB
    }
`;

export const GameSelectIconSVG = styled.img `
    &:hover{
        animation: fadeInAndOut 3s infinite linear;

        @keyframes fadeInAndOut {
            0% {opacity: 1;}
            50% {opacity: 0.5;}
            100% {opacity: 1;}
        }

    }

`;