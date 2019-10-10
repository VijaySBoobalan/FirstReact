import React from 'react';
import axios from 'axios';
import {server} from './config';
import { Link } from "react-router-dom";

class View extends React.Component{
    constructor(props) {
        super(props);
        this.state = {names: '',gst_no:'',Data:[]};
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log(props);
    }

    componentDidMount(){
        axios.get(server +'/api/tasks').then(res => {
           this.setState({Data:res.data});
        })
        .catch(function (error) {
         console.log(error);
       })
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.delete(server +'/api/tasks/'+this.props.match.params.id);
        this.props.history.push('/view');
    }

    render(){ 
        return (
            <div className="row">
                    <div className="container">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <td>ID</td>
                                <td>name</td>
                                <td>gst_no</td>
                                <td>Actions</td>
                            </tr>
                            </thead>
                            <tbody>
                                {this.state.Data.map((Da,index)=>
                                    <tr key={index}>
                                        <td>{++index}</td>
                                        <td>{Da.name}</td>
                                        <td>{Da.gst_no}</td>
                                        <td>
                                            <form onSubmit={this.handleSubmit}>
                                                <Link to={"edit/"+Da.id} className="btn btn-primary">Edit</Link>&nbsp;
                                                <input type="submit" value="Delete" className="btn btn-danger"/>
                                            </form>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
        ) 
    }
}
export {View}