import React, { Component } from 'react';

class TaskItem extends Component {
    onUpdateStatus =()=>{
        this.props.onUpdateStatus(this.props.task.id)
    }
    OnDelete = ()=>{
        this.props.onDelete(this.props.task.id)
    }
    onUpdate = ()=>{
        this.props.onUpdate(this.props.task.id)
    }
    render() {
        let {task, index}=this.props;
        return (
            <tr>
            <td>{index +1}</td>
            <td>{task.name}</td>
            <td className="text-center ">
                <span className={task.status ? 'label label-success pointer':'label label-danger pointer'}
                    onClick={()=>this.onUpdateStatus()} 
                        >
                {task.status ? 'Kích Hoạt':'Ẩn'}
                </span>
            </td>
            <td className="text-center">
                <button 
                type="button" 
                className="btn btn-warning"
                onClick={()=>this.onUpdate()}
                >
                <span className="fa fa-pencil mr-5" />Sửa
                </button>
                &nbsp;
                <button onClick={()=>this.OnDelete()} type="button" className="btn btn-danger">
                <span className="fa fa-trash mr-5" />Xóa
                </button>
            </td>
            </tr>
        );
    }
}

export default TaskItem;
