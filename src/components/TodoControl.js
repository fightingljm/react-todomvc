import React from 'react';

class TodoControl extends React.Component {
  constructor() {
    super();
    this.state={
      btns:['All','Active','Completed']
    }
  }
  render(){
    return(
      <div>
        {/* <button className="btn btn-primary" onClick={()=> this.props.handleFilter('All')}>All</button>
        <button className="btn btn-warning" onClick={()=> this.props.handleFilter('Active')}>Active</button>
        <button className="btn btn-success" onClick={()=> this.props.handleFilter('Completed')}>Completed</button> */}
        {this.state.btns.map(
          item=><button key={Math.random()}
            onClick={()=> this.props.handleFilter(item)}
            className={this.props.visible===item ? 'btn btn-info' : 'btn btn-default'}>{item}</button>
        )}
      </div>
    )
  }
}

export default TodoControl;
