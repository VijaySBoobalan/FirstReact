import React from 'react';
import axios from 'axios';
import {server} from './config';

class Welcome extends React.Component{
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {names: '',gst_no:'',Data:[]};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        axios.get(server +'/api/tasks').then(res => {
           this.setState({Data:res.data});
        });
    }


    handleChange(event) {
        this.setState({ 
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post(server + '/api/tasks', {
            name: this.state.names,
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
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="container">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <label>Customer Name</label>
                                        <input type="text" className="form-control" onChange={this.handleChange} placeholder="Enter Name" name="names"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <label>GST No</label>
                                        <input type="text" className="form-control" onChange={this.handleChange} min="0" placeholder="Enter GST No" name="gst_no"></input>
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

export default Welcome