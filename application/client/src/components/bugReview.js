import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "react-bootstrap/Card";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";
import Button from "react-bootstrap/Button";
import {BugStore} from "../store/bugStore";
import {OrganizerStore} from "../store/organizerStore";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Alert} from "../components/alerts";



let reportBugs = "Hjelp oss med å finne feil i systemet";
let listBugs = "Feil du tidligere har raportert inn";

export class BugReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description : '',
            bugList : []
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    render(){
        return(
                <Card.Body>
                    <FormGroup controlId="ControlTextarea" className="bugWindow">
                        <FormLabel>
                            {reportBugs}
                        </FormLabel>
                        <Row>
                            <FormControl
                                as="textarea" rows="3"
                                name = "description"
                                placeholder = "Skriv din tilbakemelding her"
                                value = {this.state.description}
                                onChange = {this.handleInputChange}
                            />
                        </Row>
                        <Row>
                            <Button className="bugButton" variant="success" onClick={this.handleSubmit}>Publiser</Button>
                        </Row>
                    </FormGroup>

                    <FormGroup className="bugWindow">
                        <FormLabel>{listBugs}</FormLabel>
                            <ListGroup>
                                {this.state.bugList.map( bug => (
                                    <ListGroup.Item key={bug.bugID}>
                                        <Row>
                                            <Col sm={8}>
                                                {bug.description}
                                            </Col>
                                            <Col sm={2}>
                                                {this.formatDate(bug.date)}
                                            </Col>
                                            <Col sm={1}>
                                                <button id={bug.bugID} onClick={this.deleteBug}>Slett</button>
                                            </Col>
                                        </Row>

                                    </ListGroup.Item>
                                ))}
                        </ListGroup>
                    </FormGroup>

                </Card.Body>
        )
    }

    componentDidMount() {
        this.listBugs();
    }
    /*
       Changes the this.state.description when text is put inn.
     */

    handleInputChange(event) {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        this.setState({[name]: value,});

    }
    /*
        Saves the input to the database when pushed.
        Also updates the list with registrated bugs.
     */
    handleSubmit(event){
        event.preventDefault();
        if (this.state.description === ''){
            Alert.info("Tilbakemeldingen kan ikke være tom")
        } else {
            BugStore.registerBug(OrganizerStore.currentOrganizer.organizerID, this.state.description, statusCode => {
                if (statusCode === 200){
                    Alert.success("Din tilbakemelding ble registrert");
                    BugStore.getAllBugsFromOrganizer(OrganizerStore.currentOrganizer.organizerID, () => {
                        this.setState( {bugList : BugStore.allBugsReportedByOrganizer})
                    })
                }else{
                    Alert.warning("Det oppsto et problem. Prøv igjen, eller ta kontakt med oss!")
                }
            });
        }
    };

    /*
        List all all bugs from the database to from one organizer.
    */
    listBugs = () => {
        console.log(OrganizerStore.currentOrganizer.organizerID);
        BugStore.getAllBugsFromOrganizer( OrganizerStore.currentOrganizer.organizerID, () => {
            this.setState(
                { bugList : BugStore.allBugsReportedByOrganizer})
        });
        console.log(this.state.ticketList);
    };

    /*
        Deletes a selected bug from the database. 
     */
    deleteBug = (event) => {
        BugStore.deleteBug(event.target.id, statusCode => {
            if (statusCode === 200){
                Alert.success("Din tilbakemelding ble slettet!");
                this.listBugs();
            }
            else{
                Alert.warning("Det oppsto et problem. Prøv igjen, eller ta kontakt med oss!");
            }
        }).then(r => console.log('Deleting done'));

    };

    // Converts the date of an event to a more readable format
    formatDate = (d) => {
        let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        let date = new Date(d);
        return date.toLocaleDateString("nb-NO", options).toLocaleUpperCase();
    }

}