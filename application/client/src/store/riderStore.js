import axios from "axios";


import {RiderElement} from "../classes/riderElement"
import {CookieStore} from "./cookieStore";
const axiosConfig = require("./axiosConfig");


export class RiderStore {
    allRidersForCurrentEvent = [];

    //get a rider element
    getRider(riderID) {

        let header = {
            "Content-Type": "application/json",
            "x-access-token": CookieStore.currentToken
        };

        axios.get(axiosConfig.root + '/api/rider/' + riderID, {headers: header})
            .then(response => {
                return new RiderElement(response.data[0].riderID, response.data[0].artistID,
                    response.data[0].eventID, response.data[0].status, response.data[0].isDone,
                    response.data[0].description);
            }
        )
            .catch(error => console.log(error));
    }

    //get all rider elements for an artist
    getAllRiderElementsFromArtist(artistID) {
        let allRiderElementsFromArtist = [];
        let header = {
            "Content-Type": "application/json",
            "x-access-token": CookieStore.currentToken
        };

        axios.get(axiosConfig.root + '/api/artist/' + artistID + '/rider', {headers: header}).then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    allRiderElementsFromArtist.push(new RiderElement(response.data[0].riderID, response.data[0].artistID,
                        response.data[0].eventID, response.data[0].status, response.data[0].isDone,
                        response.data[0].description));
                }
            }
        )
            .catch(error => console.log(error));
        return allRiderElementsFromArtist;
    }

    //get all rider elements for an artist for an event
    getAllRiderElementsFromArtistAndEvent(eventID, artistID){
        let header = {
            "Content-Type": "application/json",
            "x-access-token": CookieStore.currentToken
        };
        let allRiderElementsFromArtistAndEvent = [];
        axios.get(axiosConfig.root + '/api/event/' + eventID + '/artist/' + artistID + '/rider', {headers: header})
            .then(response => {
                for(let i = 0; i < response.data.length; i++){
                    allRiderElementsFromArtistAndEvent.push(new RiderElement(response.data[0].riderID, response.data[0].artistID,
                        response.data[0].eventID, response.data[0].status, response.data[0].isDone,
                        response.data[0].description));
                }
            }
       )
            .catch(error => console.log(error));
        return allRiderElementsFromArtistAndEvent;
    }

    //get all riders for an event
    storeAllRidersForEvent(eventID){
        let header = {
            "Content-Type": "application/json",
            "x-access-token": CookieStore.currentToken
        };
        axios.get(axiosConfig.root + '/api/event/' + eventID + '/rider', {headers: header})
            .then(response => {
                this.allRidersForCurrentEvent = [];
                for(let i = 0; i < response.data.length; i++){
                    this.allRidersForCurrentEvent.push(new RiderElement(response.data[0].riderID, response.data[0].artistID,
                        response.data[0].eventID, response.data[0].status, response.data[0].isDone,
                        response.data[0].description))
                }
            })
            .catch(error => console.log(error));
    }


    //create a new rider element.
    createNewRiderElement(callback, artistID, eventID, description){
        let header = {
            "Content-Type": "application/json",
            "x-access-token": CookieStore.currentToken
        };

        axios.post(axiosConfig.root + '/api/rider', {
            artistID: artistID,
            eventID: eventID,
            description: description
        }, {headers: header}).then(response =>{
            callback(new RiderElement(response.data.insertId, artistID, "", false, description));
        }).catch(error => console.log(error));
    }

    //update a rider element
    updateRider(riderElementID, artistID, eventID, status, isDone, description){
        let header = {
            "Content-Type": "application/json",
            "x-access-token": CookieStore.currentToken
        };
        axios.put(axiosConfig.root + '/api/event/' + eventID + '/artist/' + artistID + '/rider/' + riderElementID, {
            riderElementID: riderElementID,
            artistID: artistID,
            eventID: eventID,
            status: status,
            isDone: isDone,
            description: description
        }, {headers: header})
            .catch(error => console.log(error));
    }

    //delete a rider element
    deleteRider(eventID, artistID, riderID){
        let header = {
            "Content-Type": "application/json",
            "x-access-token": CookieStore.currentToken
        };
        axios.delete(axiosConfig.root + '/api/event/' + eventID + '/artist/' + artistID + '/rider/' + riderID, {headers: header})
            .catch(error => console.log(error));
    }
}

export let riderStore = new RiderStore();


