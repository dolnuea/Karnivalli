import styled from "styled-components";
import backgroundImage from '../images/fire_vs.gif';


export const HeaderBox = styled.div `
    
    background-color: rgb(255, 230, 239, 0.8);
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    padding: 35px 70px;
    margin-top: 20px;
    border-radius: .5em;

    transition-property: transform, background-color,  color;
    transition-duration: .3s;
    transition-timing-function: cubic-bezier(0.37, 0, 0.63, 1);


    &:hover{
        color: whitesmoke;
        background-color: #ff124f;
        transform: scale(1.15);

        animation: pulse 2000ms;
        animation-iteration-count: infinite;

        @keyframes pulse {
            0% {border-radius: .5em; opacity: 1; color: #581845}
            50% {border-radius: 2em; opacity: 0.75; color: whitesmoke}
            100% {border-radius: .5em; opacity: 1; color: #581845}
        }
`

export const Header = styled.h1` 
    display: flex;
    justify-content: center;
`

export const Background = styled.div`
<<<<<<< HEAD

    background-image: url(${backgroundImage});
    background-size:cover;
   
=======
    background-image: url(${backgroundImage}) ;
    background-size: cover;
>>>>>>> jakeSoundFX
`

export const Body = styled.div`
    color: #333;
    font-family: "Catamaran", sans-serif;
    box-sizing: border-box;
    height: 100vh;
    width: 100%;
    display: transparent;
    justify-content: center;
    align-items: center;
    padding-bottom: 100px;
    
`

export const Game = styled.div`
    background-color: rgb(255, 230, 239, 0.8);
    flex: 1 1 auto;
    max-width: 400px;
    height: 500px;
    border: 5px solid #ff124f;
    font-size: 1.1em;
    border-radius: 1em;
    display: flex;
    flex-direction: column;
    padding-left:5px;
    padding-right:5px;
    padding-bottom: 30px;
`

export const BoardContainer = styled.div`
    width: 100%;
    padding-top: 100%;
    /* 1:1 Aspect Ratio */
    position: relative;
    /* If you want text inside of it */
`

export const Board = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-column-gap: 2px;
    grid-row-gap: 2px;
`

export const ScoreBoard = styled.div`
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    justify-content: center;
    background-color: none;
    font-size: 25px;
    font-weight: bold;
    padding: 3px;
`

export const Slot = styled.button`
    background-color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Quicksand";
    font-weight: 300;
    font-size: 3em;
    border-radius: 5px;
    border:none;

    &:hover {
        background-color: #bbb;
    }

    &:active {
        background-color: #aaa;

        animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        perspective: 1000px;

    }

    @keyframes shake {
        30%, 50%, 70% {
            transform: translate3d(-2px, 0, 0);
        }
`
