import React from 'react';
import axios from 'axios';
import {server} from './config';

class Edit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {name: '',gst_no:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log(props.match.params.id);
    }

    componentDidMount(){
        axios.get(server +'/api/tasks/'+this.props.match.params.id).then(response => {
            console.log(response.data);
           this.setState({ name: response.data.name, gst_no: response.data.gst_no });
        })
        .catch(function (error) {
         console.log(error);
       })
    }

    handleChange(event) {
        this.setState({ 
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.put(server + '/api/tasks/'+this.props.match.params.id, {
            name: this.state.name,
            gst_no: this.state.gst_no
        })
        .then( 
            (response) => { 
                this.props.history.push('/view');
            },
            (error) => { console.log(error.response) }
        );
    }

    render(){ 
        return (
            <div className="row">
            <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="container">
                        <h1 align="center">Edit</h1>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <label>Customer Name</label>
                                        <input type="text" className="form-control" onChange={this.handleChange} placeholder="Enter Name" value={this.state.name} name="name"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <label>GST No</label>
                                        <input type="text" className="form-control" onChange={this.handleChange} min="0" placeholder="Enter GST No" value={this.state.gst_no} name="gst_no"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="container">
                            <div className="form-group">
                                <input type="submit" value="Submit" className="btn btn-primary"/>
                            </div>
                        </div>
                    </div>
                </form>                
            </div>
        ) 
    }
}
export {Edit}