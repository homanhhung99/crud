import React, { Component } from 'react';
import Control from './components/Control';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';
import _ from 'lodash'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],// id: unique,name,status
      isDisplayForm: false,
      taskEditing:null,
      filter:{
        name:'',
        status:-1
      },
      sortBy:'name',
      sortValue:1
    }
  }
  componentWillMount() {
    if(localStorage &&  localStorage.getItem('tasks')){
      var tasks = JSON.parse(localStorage.getItem('tasks'))
      this.setState({
        tasks : tasks
      })
    }
  }
  onCloseForm = ()=> this.setState({isDisplayForm: false,taskEditing:null})//đóng mở tasks form
  randomStringId = ()=> Math.floor((1+Math.random())*0x10000).toString(16).substring(1)//random key
  generateId= () => this.randomStringId()+'-'+ this.randomStringId() + this.randomStringId()+'-'+ this.randomStringId()+'-'+ this.randomStringId();//create key
  onToggleForm = ()=> {
    if(this.state.isDisplayForm && this.state.taskEditing !== null)
    {
      this.setState({isDisplayForm: true,taskEditing:null})
    }else
    this.setState({isDisplayForm: !this.state.isDisplayForm,taskEditing:null})
  }//thay đổi form
  showForm = ()=> this.setState({isDisplayForm:true})
  onSubmitValue=(data)=>{
    // console.log(data);
    var {tasks} = this.state
    if(data.id ===''){
      data.id = this.generateId()
      tasks.push(data)
    }
    else{
      var index = this.findIndex(data.id)
      tasks[index]=data
    }
    this.setState({
      tasks:tasks,
      taskEditing:null
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  onUpdateStatus = (id)=>{
    var {tasks} = this.state
    // var index = this.findIndex(id)
    var index = _.findIndex(tasks,(task)=>{
      return task.id === id
    })
    if(index!==-1)
    {
      tasks[index].status = !tasks[index].status
      this.setState({
        tasks: tasks
      })
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }
  findIndex = (id)=>{
    var {tasks} = this.state;
    var result = -1
    tasks.forEach((task,index)=>{
      if(task.id===id)
      {
        result = index
      }
    })
    return result
  }
  onDelete=(id)=>{
    var {tasks} = this.state
    var index = this.findIndex(id)
    if(index!==-1)
    {
      tasks.splice(index,1)
      this.setState({
        tasks: tasks
      })
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    this.onCloseForm()
  }
  onUpdate = (id)=>{
    var {tasks} = this.state
    var index = this.findIndex(id)
    var taskEditing = tasks[index]
    // console.log(taskEditing);
    this.setState({
      taskEditing:taskEditing
    })
    this.showForm()
  }
  onFilter = (filterName,filterStatus)=>{
    filterStatus = parseInt(filterStatus,10)
    this.setState({
      filter:{
        name:filterName.toLowerCase(),
        status:filterStatus
      }
    })
  }
  onSearch=(keyword)=>{
    this.setState({
      keyword:keyword
    })
  }
  onSort = (sortBy,sortValue)=>{
      this.setState({
        sortBy:sortBy,
        sortValue:sortValue
      })
      // console.log("STATE"+this.state.sortBy + this.state.sortValue);
      // console.log('ONNNNNNN : '+sortBy+"_"+sortValue);
  }
  render() {
    var {tasks,isDisplayForm,taskEditing,filter,keyword,sortBy,sortValue} = this.state
    // console.log(filter);
    if(filter){//filter === true
      if(filter.name){//filter.name tồn tại
        tasks = tasks.filter((task)=>{
          // console.log(task);
          return task.name.toLowerCase().indexOf(filter.name) !== -1
        })
      }
        tasks = tasks.filter((task)=>{
          if(filter.status===-1){
            return task
          }else
          {
            return task.status === (filter.status===1?true:false)
          }
        })
    }
    if(keyword){
      console.log(keyword);
      // tasks = tasks.filter((task)=>{
      //   return task.name.toLowerCase().indexOf(keyword) !== -1
      // })
      tasks = _.filter(tasks,(task)=>{
        return task.name.toLowerCase().indexOf(keyword.toLowerCase())!==-1;
      })
    }
  
    if(sortBy==='name'){
      tasks.sort((a,b)=>{
        // console.log(a.name + " :a--b: " +b.name +' VALUE: '+sortValue);
        if(a.name > b.name) return sortValue
        else if(a.name < b.name) return -sortValue
        else return 0
      })
    }else{
      tasks.sort((a,b)=>{
      if(a.status > b.status) return -sortValue;
      else if(a.status < b.status) return sortValue;
      else return 0
       })
    }
    // console.log(sortBy+ "_"+sortValue);
    var elmTaskForm = isDisplayForm?
                      <TaskForm taskEditing={taskEditing} 
                      onSubmitValue={this.onSubmitValue} 
                      setForm={()=>this.onCloseForm()}/>:'';
    return (
      <div>
         <div className="container">
        <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>
        <div className="row">
        <div className={isDisplayForm?"col-xs-4 col-sm-4 col-md-4 col-lg-4":''}>
            {elmTaskForm}
        </div>
            <div className={isDisplayForm?"col-xs-8 col-sm-8 col-md-8 col-lg-8":"col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                <button type="button" 
                        className="btn btn-primary ml-5"
                        onClick={()=>this.onToggleForm()}>
                    <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                </button>
                <Control sortBy={sortBy} sortValue={sortValue} onSort={this.onSort} onSearch={this.onSearch}/>
                <div className="row mt-15">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <TaskList onFilter={this.onFilter} onUpdate={this.onUpdate} tasks = {tasks} onDelete={this.onDelete} onUpdateStatus={this.onUpdateStatus}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
      </div>
    );
  }
}

export default App;
