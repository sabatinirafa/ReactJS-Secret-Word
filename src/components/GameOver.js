import React from 'react'

const GameOver = ({retry}) => {
  return (
    <div>
      <h1>Gmae Over!</h1>
      <button onClick={retry}>Recomeçar o jogo</button>
    </div>
  )
}

export default GameOver