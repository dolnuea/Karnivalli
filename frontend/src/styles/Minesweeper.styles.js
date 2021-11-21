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
    font-size: larger;
    font-weight: bold;
    background-color: wheat;
    text-align: center;
`