import React, {Component} from 'react';


import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";


export class Performers extends Component{
    render(){
        return(
            <div>
                Performers
            </div>
        )
    }
}

export class AddPerformer extends Component{
    render(){
        return(
            <div>
                <div className="row align-items-center">

                    <div className="col-1">
                        <img src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/19339625881548233621-512.png" width={50}/>
                    </div>

                    <div className="col-8">
                        Lorde<br/>
                        artist@hotmail.com
                    </div>

                    <div className="col-3">
                        <label for="genreSelect">Sjanger</label>
                        <select className="form-control" id="genreSelect">
                            <option>Blues</option>
                            <option>Country</option>
                        </select>
                    </div>

                </div>
                <hr></hr>
                <div className="row">
                    <div className="col-12">
                        Riders<br/>

                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder=""
                                aria-label=""
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <Button variant="outline-secondary">Legg til rider</Button>
                            </InputGroup.Append>
                        </InputGroup>

                        <Riders/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-2">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="signedContract"/>
                            <label className="form-check-label" for="signedContract">
                                Utført
                            </label>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="performerPayed"/>
                            <label className="form-check-label" for="riderCompleted">
                                Betalt
                            </label>
                        </div>
                    </div>
                </div>

               <div className="row">
                   <div className="col-4">

                   </div>
               </div>

            </div>
        )
    }
}

export class Riders extends Component{
    render(){
        return(
            <div className="card card-body">
                <div className="row align-items-center">

                    <div className="col-6">
                        Knekkebrød med ost
                    </div>

                    <div className="col-2">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="riderCompleted" />
                                <label className="form-check-label" for="riderCompleted">
                                    Utført
                                </label>
                        </div>
                    </div>

                    <div className="col-4">
                        <input type="text" className="form-control" placeholder="Status" />
                    </div>

                </div>
            </div>
        )
    }
}