import axios from "axios";

import {RiderElement} from "../classes/riderElement"
import {CookieStore} from "./cookieStore";


const axiosConfig = require("./axiosConfig");

export class RiderStore {
    static allRidersForCurrentEvent = [];

    static addToAllRidersForCurrentArtistAndEvent(rider){
        this.allRidersForCurrentArtistAndEvent.push(rider);
    }

    //get a rider element
    static getRider(riderID) {

        let header = {
            "Content-Type": "application/json",
            "x-access-token": CookieStore.currentToken
        };

        return axios.get(axiosConfig.root + '/api/rider/' + riderID, {headers: header})
            .then(response => {
                    return new RiderElement(response.data[0].riderID, response.data[0].artistID,
                        response.data[0].eventID, response.data[0].status, response.data[0].isDone,
                        response.data[0].description);
                }
            )
            .catch(error => console.log(error));
    }

    //get all riders for an event
    static storeAllRidersForEvent(callback, eventID) {
        this.allRidersForCurrentEvent = [];
        let header = {
            "Content-Type": "application/json",
            "x-access-token": CookieStore.currentToken
        };
        axios.get(axiosConfig.root + '/api/event/' + eventID + '/rider', {headers: header})
            .then(response => {


                response.data.map( data => {

                    this.allRidersForCurrentEvent.push(new RiderElement(data.riderElementID, data.artistID,
                        data.status, data.isDone === 1, data.description))
                });

                callback();

            })
            .catch(error => console.log(error));
    }


    //create a new rider element.
    static createNewRiderElement(callback, artistID, eventID, description) {
        let header = {
            "Content-Type": "application/json",
            "x-access-token": CookieStore.currentToken
        };

        axios.post(axiosConfig.root + '/api/rider', {
            artistID: artistID,
            eventID: eventID,
            description: description
        }, {headers: header}).then(response => {
            callback(new RiderElement(response.data.insertId, artistID, "", false, description));
        }).catch(error => console.log(error));
    }

    //update a rider element
    static updateRider(callback, riderElementID, artistID, eventID, status, isDone, description) {
        console.log("From rider store: " + riderElementID + artistID + eventID + status + isDone + description);

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
        }, {headers: header}).then(response => {
            callback();
        }).catch(error => console.log(error));
    }

    //delete a rider element
    static deleteRider(callback, eventID, artistID, riderID) {
        let header = {
            "Content-Type": "application/json",
            "x-access-token": CookieStore.currentToken
        };
        axios.delete(axiosConfig.root + '/api/event/' + eventID + '/artist/' + artistID + '/rider/' + riderID, {headers: header}).then(callback()).catch(error => console.log(error));
    }
}


