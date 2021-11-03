import React from 'react';

const Cell = (props) => {

    function getValue() {
        const { value } = this.props;

        if (!value.isRevealed) {
            return this.props.value.isFlagged ? "🚩" : null;
        }
        if (value.isMine) {
            return "💣";
        }
        if (value.neighbour === 0) {
            return null;
        }
        return value.neighbour;
    }
    
    let className = "cell" + (this.props.value.isRevealed ? "" : " hidden") + (this.props.value.isMine ? " is-mine" : "") + (this.props.value.isFlagged ? " is-flag" : "");

    return (
        <div ref="cell" onClick={this.props.onClick} className={className} onContextMenu={this.props.cMenu}>
            {getValue()}
         </div>
        );
}
export default Cell;