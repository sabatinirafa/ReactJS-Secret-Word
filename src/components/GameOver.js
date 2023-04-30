import React from 'react'

const GameOver = ({retry}) => {
  return (
    <div>
      <h1>Restart the game</h1>
      <button onClick={retry}>Restatra o jogo</button>
    </div>
  )
}

export default GameOver