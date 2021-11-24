
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
        bottom: 100px;
        right: 75px;
    }

    &:nth-child(2) {
        top: 150px;
        right: 10px;
    }
    
    &:nth-child(3) {
        top: 50px;
        left: 50px;
    }

    &:nth-child(4) {
        top: 20px;
        left: -100px;
    }
    
`;

export const WelcomeColumnLeft = styled.div `
    padding-left: 20px;
    
`;


export const WelcomeColumnRight = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 7rem;
    position: relative;

`;

