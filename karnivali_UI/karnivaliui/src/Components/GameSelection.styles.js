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
    border: 10px solid;
    border-radius: 12%;
    border-color:  rgb(88, 24, 69, 0.7);
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    color: rgb(255, 195, 15, 0.7);
    background-color: rgb(149, 112, 221);
    transition-property: transform, background-color, color;
    transition-duration: .3s;
    transition-timing-function: cubic-bezier(0.37, 0, 0.63, 1);

    &:hover{
        background-color: ${(props) => props.hoverColor};
        transform: scale(1.15);
        color: rgb(88, 24, 69);
    }
`