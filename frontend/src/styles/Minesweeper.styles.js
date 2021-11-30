import styled from 'styled-components';

export const MinesweeperContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;

`

export const Clear = styled.div`
    clear: both;
    content: "";
`

export const Board = styled.div`
    display: inline;
    margin: 50px auto;
`

export const GameInfo = styled.div`
    min-height: 50px;
    display: flex;
    justifiy-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    background-color: whitesmoke;
    color: #120458;
    border: 5px solid #120458;
    border-top-right-radius: 1em;
    border-top-left-radius: 1em;
`