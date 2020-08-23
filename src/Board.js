import React, { Component } from 'react'
import Cell from './Cell'
import './Board.css'

class Board extends Component{

  static defaultProps = {
    nrows : 5,
    ncols : 5,
    chanceLightStartOn : 0.25
  }

  constructor(props){
    super(props)
    this.state = {
      board:this.createBoard(),
      hasWon : false
    }
    this.flipCellAround = this.flipCellAround.bind(this)
  }

  createBoard(){
    let board = []
    for(let x=0; x < this.props.nrows; x++){
      let row = []
      for(let y=0; y < this.props.ncols; y++){
        row.push(Math.random() < this.props.chanceLightStartOn)
      }
      board.push(row)
    }
    return board
  }

  flipCellAround(coord){
    const [x, y] = coord.split('-').map(Number)
    const {nrows, ncols} = this.props
    const board = this.state.board

    //flipping logic
    function flipCell(x,y){
      if(x >= 0 && x < nrows && y >= 0 && y < ncols){
        board[x][y] = !board[x][y]
      }
    }

    //flipping cell and its neighbour
    flipCell(x,y)
    flipCell(x-1,y)
    flipCell(x+1,y)
    flipCell(x,y-1)
    flipCell(x,y+1)

    //determine win or not
    let hasWon = false
    hasWon = board.every(row => row.every( cell => !cell))
    
    //changing board state
    this.setState({board, hasWon})
  }
  
  makeTable(){
    let tableBoard = []
    for(let x=0; x < this.props.nrows; x++){
      let row = []
      for(let y=0; y < this.props.ncols; y++){
        let coord = `${x}-${y}`
        row.push(
          <Cell
            key={coord}
            isLight={this.state.board[x][y]} 
            coord={coord} 
            flip={this.flipCellAround} 
          />
        )
      }
      tableBoard.push(<tr>{row}</tr>)
    }
    return (
      <table className='Board'>
        <tbody>{tableBoard}</tbody>
      </table>
    );
  }

  render(){  
    return (
      <div>
        {this.state.hasWon ? (
          <div className='winner'>
            <span className='neon-orange'>YOU</span>
            <span className='neon-blue'>WIN!</span>
          </div>
        ) : (
          <div>
            <div className='Board-title'>
              <div className='neon-orange'>Lights</div>
              <div className='neon-blue'>Out</div>
            </div>
            {this.makeTable()}
          </div>
        )}
      </div>
    );
  }
}

export default Board