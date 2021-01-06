import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state={
            filterName:'',
            filterStatus:-1
        }
    }
    onChange = (event)=>{
        var target = event.target
        var name = target.name
        var value = target.value
        this.props.onFilter(name === 'filterName'? value : this.state.filterName,name === 'filterStatus'? value : this.state.filterStatus)
        this.setState({
            [name]:value
        })
    }
    render() {
        var {tasks} = this.props;
        var {filterName,filterStatus}= this.state
        var elmTasks = tasks.map((task,index)=> <TaskItem onUpdate={this.props.onUpdate} onDelete={this.props.onDelete} onUpdateStatus={(id)=>this.props.onUpdateStatus(id)} key={task.id} index={index} task={task}/>)
        return (
             <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td />
                        <td>
                            <input onChange={(event)=>this.onChange(event)} value={filterName} name="filterName" type="text" className="form-control" />
                        </td>
                        <td>
                            <select onChange={(event)=>this.onChange(event)} value={filterStatus} name="filterStatus" className="form-control">
                                <option value={-1}>Tất Cả</option>
                                <option value={0}>Ẩn</option>
                                <option value={1}>Kích Hoạt</option>
                            </select>
                        </td>
                        <td />
                        </tr>
                      { elmTasks }
                    </tbody>
            </table>

        );
    }
}

export default TaskList;
