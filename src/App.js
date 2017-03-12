import React from 'react';
import TodoList from './components/TodoList';
import TodoControl from './components/TodoControl';

class Test extends React.Component {
  constructor() {
    super();
    this.state={
      inputValue:'',
      data:[
        {text:'aaa',completed:true,id:1},
        {text:'bbb',completed:false,id:2},
        {text:'ccc',completed:false,id:3}
      ],
      visible:'All'
    }
  }
  handleInput(e){
    this.setState({inputValue:e.target.value})
  }
  handleSubmit(e){
    e.preventDefault();
    let newItem = this.state.inputValue.trim();//去掉首尾空格
    if(newItem.length===0){
      alert('输入内容不能为空')
    }else{
      let newTodo = {
        text:newItem,
        completed:false,
        id:new Date().getTime()
      }
      this.setState({data:[...this.state.data,newTodo]})
    }
    this.setState({inputValue:''})
  }
  handleCompleted(id){
    // console.log(index);
    let index = this.state.data.findIndex(item=>item.id===id)
    this.state.data[index].completed=!this.state.data[index].completed;
    this.setState({data:this.state.data})
  }
  handleRemove(id){
    let index = this.state.data.findIndex(item=>item.id===id)
    this.state.data.splice(index,1)
    //splice() 方法返回的是被删除的元素,不是一个数组,所以不能直接给data赋值
    this.setState({data:this.state.data})
  }
  handleFilter(visible){
    this.setState({visible:visible})
  }
  componentWillMount(){
    if(localStorage.todos){
      this.setState({data:JSON.parse(window.localStorage.getItem('todos') || '[]')})
    }
  }
  render(){
    localStorage.setItem('todos',JSON.stringify(this.state.data))
    let styles = {
      root:{
        maxWidth:'270px',
        margin:'0 auto'
      }
    }
    let showData;
    switch(this.state.visible){
      case 'Active':showData=this.state.data.filter(item=>!item.completed);break;
      case 'Completed':showData=this.state.data.filter(item=>item.completed);break;
      default:showData=this.state.data;
    }
    return(
      <div style={styles.root}>
        <h1 style={{textAlign:'center'}}>TODO</h1>

        <form onSubmit={this.handleSubmit.bind(this)} className="form-inline">
          <div className="form-group">
            <input type='text' value={this.state.inputValue} onChange={this.handleInput.bind(this)} className="form-control" />
            <button className="btn btn-default">Add #{this.state.data.length+1}</button>
          </div>
        </form>

        <TodoList data={showData} handleCompleted={this.handleCompleted.bind(this)} handleRemove={this.handleRemove.bind(this)}/>

        <TodoControl handleFilter={this.handleFilter.bind(this)} visible={this.state.visible}/>
        {/* {this.state.visible} */}
      </div>
    )
  }
}

export default Test;
