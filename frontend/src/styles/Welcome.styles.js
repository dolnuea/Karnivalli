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

    &:hover{
        
        transform: scale(1.15);

    }
`;

export const WelcomeWindow = styled.div `
    height: 240px;
    width: 460px;
    background-color: rgb(255, 230, 239, 0.7);
    color: rgb(255, 195, 15);
    border-top-right-radius: 0px;
    border-bottom-left-radius: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25vh;
    
`

