import React from 'react';
import axios from 'axios';
import {server} from './config';
import { Link } from "react-router-dom";

class View extends React.Component{
    constructor(props) {
        super(props);
        this.state = {names: '',gst_no:'',Data:[]};
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        axios.get(server +'/api/tasks').then(res => {
           this.setState({Data:res.data});
        })
        .catch(function (error) {
         console.log(error);
       })
    }

    handleDelete(id) {
        axios.delete(server + '/api/tasks/'+id, {
            
        })
        .then( 
            (response) => { 
                axios.get(server +'/api/tasks').then(res => {
                   this.setState({Data:res.data});
                })
            },
            (error) => { console.log(error.response) }
        );
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
                                {this.state.Data.map((Data,index)=>
                                    <tr key={index}>
                                        <td>{++index}</td>
                                        <td>{Data.name}</td>
                                        <td>{Data.gst_no}</td>
                                        <td>
                                            <Link to={"edit/"+Data.id} className="btn btn-primary">Edit</Link>&nbsp;
                                            <button onClick={() => this.handleDelete(Data.id)} className="btn btn-sm btn-warning float-right">Delete</button>
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