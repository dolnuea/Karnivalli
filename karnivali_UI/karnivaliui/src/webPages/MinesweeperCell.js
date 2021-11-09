import React from 'react';
import {cell} from './Minesweeper.styles'; 

//creation of cells do not happen here, just updating the display of cells based on their values
export default class Cell extends React.Component {


    // we update cells based on their value decided by the user, i.e. if user flagged a cell, it will show a red flag on the cell
    getValue(){
        if (!this.props.value.isRevealed){
            return this.props.value.isFlagged ? "🚩" : null;
        }
        if (this.props.value.isMine) {
            return "💣";
        }
        if(this.props.value.neighbour === 0 ){
            return null;
        }
        return this.props.value.neighbour;
    }

    render(){
        // we render the state of the cell, and determine if they are revealed, clicked, mine, etc.
        let className = "cell" + (this.props.value.isRevealed ? "" : " hidden") + (this.props.value.isMine ? " is-mine" : "") + (this.props.value.isFlagged ? " is-flag" : "");


        return (
            <cell onClick={this.props.onClick} className={className} onContextMenu={this.props.cMenu}>
                {this.getValue()} 
            </cell>
        );
    }
}