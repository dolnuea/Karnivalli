import React, { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";


let currentTurn = true

export default function RockPaperScissor(props) {
    console.log(props)

    // const [rock, setRock] = useState('rock')
    // const [paper, setPaper] = useState('paper')
    // const [scissor, setScissor] = useState('scissor')

    let socket = new W3CWebSocket('ws://localhost:8000/ws/game/rps/' + props.roomCode)

    let userChoices = {}

    useEffect(() => {

        // This function gets executed when the 
        socket.onopen = function (e) {
            console.log('Socket connected')
        }

        socket.onmessage = function (e) {
            var data = JSON.parse(e.data).payload
            console.log(data)

            userChoices[data['player']] = data.value
            console.log(userChoices)

            if (userChoices.p1 !== undefined && userChoices.p2 !== undefined) {
                if (userChoices.p1 === userChoices.p2) {
                    alert('game is draw')
                    userChoices = {}
                } else if (userChoices.p1 === 'rock' && userChoices.p2 === 'scissor') {
                    alert('player 1 won')
                    //send message
                    userChoices = {}
                } else if (userChoices.p1 === 'paper' && userChoices.p2 === 'rock') {
                    alert('player 1 won')
                    userChoices = {}
                } else if (userChoices.p1 === 'scissor' && userChoices.p2 === 'paper') {
                    alert('player 1 won')
                    userChoices = {}
                } else {
                    alert('player 2 won')
                    userChoices = {}
                }
            }
        }

        socket.onclose = function (e) {
            console.log('Socket Closed')
        }

    }, [])

    function sendData(value, player) {
        if (currentTurn == false) {
            alert("Please wait for the oppsition's turn!!")
            currentTurn = true
            return
        } else {
            currentTurn = false
        }

        socket.send(JSON.stringify({
            value,
            player
        }))
    }



    return (
        <div>
            <button onClick={(e) => { sendData('rock', props.player) }}>Rock</button>
            <button onClick={(e) => { sendData('paper', props.player) }}>Papper</button>
            <button onClick={(e) => { sendData('scissor', props.player) }}>Scissors</button>
        </div>
    )
}
