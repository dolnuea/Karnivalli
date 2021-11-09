import styled from "styled-components";

 export const gamebody = styled.div
  `margin: 20px;
  padding: 0;
  font-family: sans-serif;
  background : url('C:/Users/dolun/OneDrive/Masaüstü/Dolunay/classes/fall 21/518/Project/karnivali_UI/karnivaliui/src/images/minesweeper_img.jpg');
  overflow : hidden;
  justify-content: space-around;
  align-items: center;
    `
  ;

/* just need to find how its rendering each cell after cell */
export const clear = styled.div
  `clear: both;
  content: ""`;

export const game = styled.div
  `display: flex;
  flex-direction: column;
  margin: 0 auto;`;

export const game_info = styled.div
  `min-height: 50px;`;

export const cell = styled.div
  `background: #fff;
  border: 1px solid #414c69;
  float: left;
  line-height: 34px;
  height: 34px;
  text-align: center;
  width: 34px;
  cursor: pointer;`;

export const cell_focus = styled.div
  `outline: none;
`;

export const hidden = styled.div
  `background: #7e7b92;`;

export const is_flag = styled.div, is_mine = styled.div
  `color: #fc543c;`;