import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import {TicketType} from "../classes/ticketType";
import { FaCalendar } from 'react-icons/fa';
import ListGroup from "react-bootstrap/ListGroup";



/* Component to add tickets to concert*/

export class GetTicket extends Component{

    tickets = TicketType.getTestTicketTypes();

    constructor(props) {
        super(props);
        this.state = {
            ticketTypeName: '',
            /*price : '',
            amount : '',
            releaseDate : '',
            endDate : '',
            releaseTime : '',
            endTime : '',
            description : '' */
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        console.log('Ticket Saved' + ' ' + 'this: ' + this);

    };

    handleInputChange(event) {
        console.log(this.state.ticketTypeName);
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.value;
        console.log(name + " verdi: " + value);
        this.setState({[name]: value,});
    }


    render() {
        return(
            <Card>
                <Card.Body>
                    {this.tickets.map(ticket => (
                    <Form key={ticket.ticketTypeID}>
                        <Form.Row className="ticketStyle" >
                            <Col sm={2}>
                                <Form.Control
                                    placeholder = {'Navn'}
                                />

                            </Col>
                            <Col sm={1}>
                                <Form.Control
                                    value={ticket.price}
                                    readOnly
                                />
                            </Col>
                            <Col sm={1}>
                                <Form.Control
                                    value={ticket.amount}
                                    readOnly
                                 />
                            </Col>
                            <Col sm={2}>
                                <Form.Control
                                    value={ticket.releaseDate}
                                    readOnly
                                />
                            </Col>

                            <Col sm={2}>
                                <Form.Control
                                    value={ticket.endDate}
                                    readOnly
                                />
                            </Col>
                            <Col sm={1}>
                                <Form.Control
                                    value={ticket.releaseTime}
                                    readOnly
                                />
                            </Col>
                            <Col sm={1}>
                                <Form.Control
                                    value={ticket.endTime}
                                    readOnly
                                />
                            </Col>
                            <Col>
                                <h5><FaCalendar/></h5>
                            </Col>
                        </Form.Row>
                        <Form.Row className="ticketStyle">
                            <Col sm={6}>
                                <Form.Control
                                    value={ticket.description}
                                    readOnly
                                />
                            </Col>
                        </Form.Row>
                        <Form.Row className="ticketStyle">
                            <Col>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Legg til denne billetten"
                                    key={ticket.ticketTypeID}
                                    onClick = {this.addToList}
                                />
                            </Col>

                        </Form.Row>

                    </Form>
                    ))}
                    <Accordion>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                + Lag ny billett
                        </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Row className="ticketStyle">
                                    <Col>
                                        <Form.Control
                                            name = "ticketTypeName"
                                            placeholder = "Navn"
                                            value = {this.state.ticketTypeName}
                                            onChange = {this.handleInputChange}

                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            name = "price"
                                            placeholder="Pris,-"
                                            onChange = {this.handleInputChange}
                                            value = {this}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            placeholder="Antall"
                                            onChange = {this.handleInputChange}
                                        />

                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type = "date"
                                            onChange={this.handleInputChange}/>
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type ="date"
                                            onChange={this.handleInputChange}
                                        />
                                    </Col>
                                    <Col >
                                        <Form.Control
                                            type = "time"
                                            placeholder="Start tid"
                                            onChange={this.handleInputChange}
                                        />
                                    </Col>
                                    <Col >
                                        <Form.Control
                                            type = "time"
                                            onChange={this.handleInputChange}
                                        />
                                    </Col>
                                    <Col>
                                        <h5><FaCalendar/></h5>
                                    </Col>
                                </Form.Row>
                                <Form.Row className="ticketStyle">
                                    <Col sm={6}>
                                        <Form.Control
                                            placeholder="Beskrivelse"
                                            onChange={this.handleInputChange}/>
                                    </Col>
                                </Form.Row>
                                <Button variant="primary" size="sm" type="submit" onClick={this.handleSubmit}>
                                    Lagre billett
                                </Button>
                            </Form>
                        </Card.Body>
                     </Accordion.Collapse>
                    </Accordion>
                </Card.Body>
            </Card>
        );
    }
}


export class ListTickets extends Component{
    render(){
        return(
            <Card>
                <Card.Body>
                    <ListGroup>
                        <ListGroup.Item>Hei</ListGroup.Item>
                        <ListGroup.Item>Hei</ListGroup.Item>
                        <ListGroup.Item>Hei</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        );
    }
}
