import React from 'react'
import Modal from 'react-modal'
import { useHistory } from 'react-router-dom';

function MyModal(props) {
    let history = useHistory()
    const customStyles = {
        overlay: {

        },
        content: {
            top: '50px',
            left: '50px',
            right: 'auto',
            bottom: 'auto',
        },
    };
    return (
        <div>
            <Modal
                isOpen={props.open}
            // style={customStyles}

            // portalClassName={ } // Can mention the class name from .css class.

            >
                <h2>{props.data}</h2>
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

export default MyModal
