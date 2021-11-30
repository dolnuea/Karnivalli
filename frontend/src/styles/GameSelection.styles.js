import styled from 'styled-components';

export const SelectionPanel = styled.div `
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 75vw;
    
`
export const Panel = styled.div `
    height: 50%;
    padding-left: 20px;
    padding-right: 20px;
    
    
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    color: rgb(255, 195, 15, 0.7);
    background-color: rgb(255, 230, 239, 0.6);
    transition-property: transform, background-color, border-radius;
    transition-duration: .3s;
    transition-timing-function: cubic-bezier(0.37, 0, 0.63, 1);


    &:hover{
        background-color: ${(props) => props.hoverColor};
        transform: scale(1.15);

        animation: pulse 700ms;
        animation-iteration-count: infinite;

        @keyframes pulse {
            0% {border-radius: 0em; opacity: 1;}
            50% {border-radius: 2em; opacity: 0.75;}
            100% {border-radius: 0em; opacity: 1;}
        }
    }
`