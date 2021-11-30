import styled from "styled-components";
//import backgroundImage from '../images/vs_two.gif';
/*
export const backgroundImage = styled.div `
    background-image: url(${Background1});
    ackground-size:cover;

`;
*/
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
        background-color: ${(props) => props.hoverColor};
        border-radius: 30em;
    }
`;

export const Rock = styled.div ` 
    font-size: 100px;
    transition-property: font-size;
    transition-duration: .6s;
    transition-timing-function: cubic-bezier(0.37, 0, 0.63, 1);

    &:hover {
        font-size: 120px;
        transform: scale(1.15);
        animation: shake 0.5s;
        animation-iteration-count: infinite;
      }
    
    @keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
    }
`;


export const Paper = styled.div ` 
    font-size: 100px;
    transition-property: font-size;
    transition-duration: .5s;
    transition-timing-function: cubic-bezier(0.37, 0, 0.63, 1);

    &:hover {
        font-size: 120px;
        transform: scale(1.15);
        animation: shake 0.7s;
        animation-iteration-count: infinite;
    }

    @keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
    }

`;


export const Scissor = styled.div ` 
    font-size: 100px;
    transition-property: font-size;
    transition-duration: .5s;
    transition-timing-function: cubic-bezier(0.37, 0, 0.63, 1);

    &:hover {
        font-size: 120px;
        transform: scale(1.15);
        animation: shake 0.5s;
        animation-iteration-count: infinite;
    }

    @keyframes shake {
        0% { transform: translate(1px, 1px) rotate(0deg); }
        10% { transform: translate(-1px, -2px) rotate(-1deg); }
        20% { transform: translate(-3px, 0px) rotate(1deg); }
        30% { transform: translate(3px, 2px) rotate(0deg); }
        40% { transform: translate(1px, -1px) rotate(1deg); }
        50% { transform: translate(-1px, 2px) rotate(-1deg); }
        60% { transform: translate(-3px, 1px) rotate(0deg); }
        70% { transform: translate(3px, 1px) rotate(-1deg); }
        80% { transform: translate(-1px, -1px) rotate(1deg); }
        90% { transform: translate(1px, 2px) rotate(0deg); }
        100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
`;

export const chatButton = styled.button ` 
    border: none;
    max-width: 10%;

`;


export const chatModalButton = styled.button `
    backgroundColor: '#7a04eb';
    borderRadius: '5px'
`;
