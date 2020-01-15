import axios from "axios";
import {sharedComponentData} from "react-simplified";
import Document from ".classes/document.js"
import {CookieStore} from "./cookieStore";

const axiosConfig = require("./axiosConfig");

class DocumentService {

    getAllDocumentsForOrganizer(organizerID) {
        let header = {
            "Content-Type": "application/json",
            "x-access-token": CookieStore.currentToken
        };
        let allDocumentsByOrganizer = [];
        axios.get(axiosConfig.root + '/api/organizer/' + organizerID + '/documents', {headers: header}).then(response => {
            for (let i = 0; i < response.data.length; i++) {
                allDocumentsByOrganizer.push(new Document(response.data[i].documentID, response.data[i].documentLink,
                    response.data[i].documentCategory));
            }
        });
        return allDocumentsByOrganizer;
    }


    getAllDocumentsForEvent(eventID){
        let allDocumentsByEvent = [];
        let header = {
            "Content-Type": "application/json",
            "x-access-token": CookieStore.currentToken
        };
        axios.get(axiosConfig.root + '/api/events/' + eventID + '/documents', {headers: header}).then(response =>  {
            for (let i = 0; i < response.data.length; i++) {
                allDocumentsByEvent.push(new Document(response.data[i].documentID, response.data[i].documentLink,
                    response.data[i].documentCategory));
            }
        });
        return allDocumentsByEvent;
    }

    addDocument(eventID, category, artistID, crewID, documentCategoryID, files){
        let header = {
            "Content-Type": "application/json",
            "x-access-token": CookieStore.currentToken
        };
        axios.post(axiosConfig.root + '/api/document/' + eventID + "/" + category, {
            "documentCategoryID" : documentCategoryID,
            "artistID": artistID,
            "crewID": crewID,
            "files": files
    }, {headers: header}).then(response => response.data);
    }


    updateDocument(documentID, eventID, name, link, artistID, crewID, categoryID) {
        let header = {
            "Content-Type": "application/json",
            "x-access-token": CookieStore.currentToken
        };
        return axios.put(axiosConfig.root + '/api/document/' + documentID, {
            "eventID":eventID,
            "documentName": name,
            "documentLink": link,
            "artistID": artistID,
            "crewID": crewID,
            "documentCategoryID": categoryID
        }, {headers: header}).then(response => response.data);
    }

    deleteDocument(id) {
        let header = {
            "Content-Type": "application/json",
            "x-access-token": CookieStore.currentToken
        };
        return axios.delete(axiosConfig.root + '/api/document/' + id, {headers: header}).then(response => response.data);
    }

    insertDocument(eventID, folderName, documentCategoryID){
        axios.post(axiosConfig.root + '/api/documents/upload/' + eventID + '/' + folderName + '/' + documentCategoryID, formdata, {})
            .then(res => console.log(res.data))
            .catch(err => console.error(err));
    }

    insertDocumentArtist(eventID, folderName, documentCategoryID, artistID){
        axios.post(axiosConfig.root + '/api/documents/upload/' + eventID + '/' + folderName + '/' + documentCategoryID + '/artist/' + artistID)
            .then(res => console.log(res.data))
            .catch(err => console.error(err));
    }

    insertDocumentCrew(eventID, folderName, documentCategoryID, crewID){
        axios.post(axiosConfig.root + '/api/documents/upload/' + eventID + '/' + folderName + '/' + documentCategoryID + '/crew/' + crewID)
            .then(res => console.log(res.data))
            .catch(err => console.error(err));
    }

}