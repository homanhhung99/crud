import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            name:'',
            status:false
        }
    }
    componentWillMount() {
        if(this.props.taskEditing){
            this.setState({
                id:this.props.taskEditing.id,
                name:this.props.taskEditing.name,
                status:this.props.taskEditing.status 
            })
        }
        console.log(this.state);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.taskEditing){
            this.setState({
                id: nextProps.taskEditing.id,
                name: nextProps.taskEditing.name,
                status: nextProps.taskEditing.status 
            })
        }else if(!nextProps.taskEditing){
            this.setState({
                id:'',
                name:'',
                status:false
            })
        }
      
    }
    onChangeValue=(event)=>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name==='status')(value = target.value==='true'?true:false)
        this.setState({
            [name]:value
        })
    }
    onSubmitValue = (event)=>{
        event.preventDefault()
        if(this.state.name ==='')
        {
            alert("Please!  fill in the information")
        }else{
            this.props.onSubmitValue(this.state)
            this.onClear()
            this.props.setForm()
        }
        console.log(this.state);
    }
    onClear = ()=>{
        this.setState({
            name:'',
            status:false
        })
        this.props.setForm()
    }

    render() {
        var {id} = this.state
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                <h3 className="panel-title inline-block">{id!==''?'Cập nhật công việc':'Thêm Công việc'}</h3>
                <span onClick={()=>this.props.setForm()} className="text-right"><i class="fas fa-times-circle"></i></span>
                </div>
                <div className="panel-body">
                <form onSubmit={this.onSubmitValue}>
                    <div className="form-group">
                    <label>Tên :</label>
                    <input type="text" className="form-control" 
                            name='name' 
                            value={this.state.name} 
                            onChange={(event)=>this.onChangeValue(event)} />
                    </div>
                    <label>Trạng Thái :</label>
                    <select className="form-control" required="required"
                            name='status' 
                            value={this.state.status }
                            onChange={(event)=>this.onChangeValue(event)}>
                                <option value={true}>Kích Hoạt</option>
                                <option value={false}>Ẩn</option>
                    </select>
                    <br />
                    <div className="text-center">
                    <button type="submit" className="btn btn-warning">{id!==''?'Cập nhật':'Thêm'}</button>&nbsp;
                    <button onClick={this.onClear} type="button" className="btn btn-danger">Hủy Bỏ</button>
                    </div>
                </form>
                </div>
            </div>

        );
    }
}

export default TaskForm;
