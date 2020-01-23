import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "react-bootstrap/Card";
import Dropzone from 'react-dropzone';
import { FaArrowAltCircleDown } from 'react-icons/fa';
import {DocumentService} from "../store/documentService";
import {EventStore} from "../store/eventStore";
import {Col} from "react-bootstrap";
import {DocumentCategory} from "../classes/documentCategory";
import Button from "react-bootstrap/Button";
import {Alert} from "./alerts";
import {createHashHistory} from "history";

let history = createHashHistory();

export class DocumentationTab extends Component{

    constructor(props) {
        super(props);
        this.state = {
            description: '',
            selectedFile: '',
            documentCategories: []
        };
    }

    onChange = (e) => {
        if (e.target.name === 'selectedFile') {
            this.setState({selectedFile: e.target.files[0]});
        } else {
            this.setState({[e.target.name]: e.target.value});
        }
    };

    checkFileType(){
        if(this.state.selectedFile.name !== ''){
            let filename = this.state.selectedFile.name;
            return (/\.(jpeg)$/i).test(filename) || (/\.(jpg)$/i).test(filename) || (/\.(png)$/i).test(filename)
                || (/\.(ai)$/i).test(filename) || (/\.(pdf)$/i).test(filename) || (/\.(pptx)$/i).test(filename)
                || (/\.(ppt)$/i).test(filename) || (/\.(xlsx)$/i).test(filename) || (/\.(xls)$/i).test(filename)
                || (/\.(docx)$/i).test(filename) || (/\.(doc)$/i).test(filename) || (/\.(rar)$/i).test(filename)
                || (/\.(7z)$/i).test(filename) || (/\.(zip)$/i).test(filename) || (/\.(rtf)$/i).test(filename)
                || (/\.(rtx)$/i).test(filename);
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {description, selectedFile} = this.state;

        const selectedCategory = document.getElementById("categorySelect");
        const selectedCategoryIndex = selectedCategory.selectedIndex;
        const selectedCategoryID = selectedCategory.value;
        const selectedCategoryName = selectedCategory.options[selectedCategoryIndex].text;
        if(this.checkFileType()){
        let formData = new FormData();
        formData.append('description', description);
        formData.append('selectedFile', selectedFile);
        DocumentService.addDocument(EventStore.currentEvent.eventID, selectedCategoryName, null, null, selectedCategoryID, formData, statusCode => {
            if (statusCode === 200){
                Alert.success("Vedlegget ble lagt til");
            }
            else{
                Alert.danger("Det skjedde en feil under opplastning, vennligst prøv igjen eller kontakt oss.");
            }
        })   } else {
            console.log("KAN IKKE LEGGE INN");
            return(
                <p>Kan ikke legge inn</p>
            );
        }
    };

    componentDidMount() {

        DocumentService.getAllDocumentCategories(list => {
            if (list !== null){
                console.log("not null");
                this.setState({documentCategories: list});
            }
            else{
                let staticList = [new DocumentCategory(1, 'Kontrakter'),
                    new DocumentCategory(2, 'Riders'),
                    new DocumentCategory(3, 'Annet')];

                this.setState({documentCategories: staticList});
            }
        })
    }


    render(){
        console.log(this.state);
        const {description, selectedFile} = this.state;
        return (
            <div className="document-event center-v padding-top-30 text-center">

                <div className="row text-left">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <span className="text-center"><h3 className="padding-bottom-20">Her kan du laste opp diverse dokumenter tilknyttet til arrangementet.</h3></span>
                        <select id='categorySelect' className={"mr-1 form-control"}>
                            {this.state.documentCategories.map(category => (
                                <option key={category.documentCategoryID} value={category.documentCategoryID}>
                                    {category.documentCategoryName}
                                </option>
                            ))}
                        </select>

                    </div>
                </div>

                <div className="row padding-top-20">
                    <div className="col-4"></div>

                    <div className="col-4">
                        <span className="btn btn-secondary btn-lg btn-file">
                            Velg fil
                            <input
                                type="file"
                                name="selectedFile"
                                onChange={this.onChange}
                            />
                        </span>
                        <Button type="button" className={"mr-1 margin-left-10 btn-success btn-lg"} onClick={this.onSubmit}>Last opp fil</Button>
                    </div>
                </div>

                <div className="row padding-top-50">
                    <div className="col-4"></div>

                    <div className="col-4">
                        <Button className={"mr-1 btn"} onClick={() => {
                            history.push("/dokumenter/" + EventStore.currentEvent.eventID)
                        }}>Gå til arrangementets dokumenter</Button>
                    </div>
                </div>




            </div>

        )
    }
}
