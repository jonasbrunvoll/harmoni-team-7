import React, {Component} from 'react';


import 'bootstrap/dist/css/bootstrap.min.css';
import {NavBar} from "./components/menu/navigation";
import {Content} from "./components/content/content";
import { HashRouter, Route} from 'react-router-dom';
import {AddPerformer, Performers} from "./components/content/performers";
import {LoginForm} from "./components/login/loginForm";
import {RegisterForm} from "./components/login/registerForm";



export class App extends Component{

    constructor(props) {
        super(props);

        this.state = {
            loggedIn : false,
        }
    }

    render(){
        if(!this.state.loggedIn){
            return(
                <div className="Login-Container">
                    <HashRouter>
                        <Route exact path="/" component={() => <LoginForm logIn={() => this.handleLogin()}/>} />
                        <Route exact path="/registrer" component={() => <RegisterForm />} />
                    </HashRouter>
                </div>
            )
        } else {
              return (
                <div className="App">
                    <HashRouter>
                        <div className="row no-gutters">
                            <div className="col-lg-2">
                                <NavBar />
                            </div>

                            <div className="col-lg-10">
                                <Route exact path="/" component={() => <Content page="test" />} />
                                <Route exact path="/opprett"/>
                                <Route exact path="/artister" component={() => <Content page={<AddPerformer/>} />} />
                                <Route exact path="/personell" component={Content}/>
                                <Route exact path="/kontrakter" component={Content}/>
                            </div>
                        </div>
                    </HashRouter>
                </div>
              );
        }
    }

    handleLogin(){
        this.setState({loggedIn: true,});
    }


}

export default App;
