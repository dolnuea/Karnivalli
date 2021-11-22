import styled from "styled-components";
import backgroundImage from '../images/xmas-tree-1.jpg';


export const Header = styled.h1` 
    display: flex;
    justify-content: center;
`

export const Background = styled.div`
    background-image: url(${backgroundImage});
`

export const Body = styled.div`
    color: #333;
    font-family: "Catamaran", sans-serif;
    box-sizing: border-box;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
`

export const Game = styled.div`
    background-color: #eee;
    flex: 1 1 auto;
    max-width: 400px;
    border: 1px solid #ccc;
    font-size: 1.1em;
    
    display: flex;
    flex-direction: column;
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
    background-color: #f0f0f0;
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

    &:hover {
        background-color: #bbb;
    }

    &:active {
        background-color: #aaa;
    }
`