import React, {Component} from 'react';
import {LoginForm} from "../login/loginForm";

import 'bootstrap/dist/css/bootstrap.min.css';


export class Content extends Component{
    render(){
        return(
            <div className="content">
                <div className="card">
                {this.props.page}
                </div>
                <LoginForm/>
            </div>
        )
    }
}



