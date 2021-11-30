
import styled from 'styled-components';


export const StartButton = styled.button`
    height: 40px;
    width: 200px;
    background-color: ${(props) => props.hoverColor};
    color: rgb(255, 230, 239, 0.7);
    font-weight: 900;
    padding: 5px 10px 5px 10px;
    border: none;
    border-radius: 5px;
    margin-top: 20px;
    transition-property: transform, background-color, color;
    transition-duration: .3s;
    transition-timing-function: cubic-bezier(0.37, 0, 0.63, 1);
    cursor:pointer;

    &:hover{
        
        transform: scale(1.15);

    }
`;

export const WelcomeWindow = styled.div `
    height: 480px;
    width: 930px;
    background-color: rgb(255, 230, 239, 0.7);
    color: rgb(255, 195, 15);
    border-top-right-radius: 0px;
    border-bottom-left-radius: 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 10vh;
    
`

export const ImageSVG = styled.img `
    position: absolute;
    width: 100%;
    height: 100%;
    max-width: 300px;
    max-height: 300px;

    &:nth-child(1) {
        bottom: 150px;
        right: 75px;
        animation-name: shakeit;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: ease;

        @keyframes shakeit {
            0% {left: 0px; top: -30px}
            25% {left: 10px; top: -25px}
            50% {left: -10px; top: -35px}
            75% {left: -10px; top: -28px}
            100% {left: 0px; top: -30px}
        }
    }

    &:nth-child(2) {
        top: 150px;
        right: 10px;
        animation: secondmove 2s infinite;
        animation-timing-function: ease-in-out;

        @keyframes secondmove {
            50% {transform: rotate(45deg);}
        }
    }
    
    &:nth-child(3) {
        top: 50px;
        left: 50px;

        animation: thirdmove 2s infinite;
        animation-timing-function: ease-in-out;

        @keyframes thirdmove {
            50% {transform: rotate(45deg);}
        }
    }

    &:nth-child(4) {
        top: 20px;
        left: -100px;

        animation: forthmove 2s infinite;
        animation-timing-function: ease-in-out;

        @keyframes forthmove {
            50% {transform: rotate(45deg);}
        }
    }
    
`;


export const WelcomeColumnRight = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 7rem;
    position: relative;

`;


export const WelcomeColumnLeft = styled.div `
    padding-left: 20px;

`;

export const TitleTextShake = styled.h1 `
    font-weight: bold;

    // transition-duration: .5s;
    // transition-property: color;

    // &:hover{
    //     color: #120458;
    // }


    animation: colorchange 10s infinite;

        @keyframes colorchange {
            25% {color: #ff124f}
            50% {color: #ff00a0}
            50% {color: #c441c4}
            75% {color: #7a04eb}
            100% {color: #120458}
        }
`;