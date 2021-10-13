import React from 'react'
import Modal from 'react-modal'

function ModalForReDir(props) {
    return (
        <div>
            <Modal isOpen={this.props.open}>
                <h2>{this.props.data}</h2>
                <button onClick={() => {
                    history.push('/game-selection')
                }}>Choose game</button>
                <button onClick={() => {
                    history.push('/start-or-join')
                }}>Play Again</button>
            </Modal>
        </div>
    )
}

export default ModalForReDir
