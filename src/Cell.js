import React, {Component} from 'react'
import './Cell.css'

class Cell extends Component{
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    this.props.flip(this.props.coord)
  }

  render(){
    const classes = 'Cell' + (this.props.isLight ? ' Cell-lit': '')
    return(
      <td className={classes} onClick={this.handleClick} />
    )
  }
}

export default Cell