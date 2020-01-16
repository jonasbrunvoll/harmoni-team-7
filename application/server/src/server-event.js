import {app,eventDao} from "./server";
import {CookieStore} from "../../client/src/store/cookieStore";

//Get all events
app.get("/api/events", (request, response) => {
    console.log("Express: Request for all events");
    eventDao.getAll((status, data) => {
        response.status(status);
        response.json(data);
    });
});

//Get one event
app.get("/api/events/:eventID", (request, response) => {
    console.log("Express: Request for all events");
    eventDao.getOne((status, data) => {
        response.status(status);
        response.json(data);
    }, request.params.eventID);
});

//Create one event
app.post("/api/events", (request, response) => {
    console.log("Express: Request to create an event");

    eventDao.createOne((status, data) => {
        response.status(status);
        response.json(data);
    }, [request.body.eventName, request.body.startDate, request.body.endDate, request.body.startTime, request.body.endTime, request.body.address, request.body.town, request.body.zipCode, request.body.status, request.body.description, request.body.publishDate, request.body.publishTime, request.body.organizerID, request.body.eventTypeID, request.body.pictureID]);
});

//Update event
app.put("/api/events/:eventID", (request, response) => {
    console.log("Express: Request to update an event");
    eventDao.updateOne((status, data) => {
        response.status(status);
        response.json(data);
    }, [request.body.eventName, request.body.startDate, request.body.endDate, request.body.startTime, request.body.endTime, request.body.address, request.body.town, request.body.zipCode, request.body.status, request.body.description, request.body.publishDate, request.body.publishTime, request.body.eventTypeID, request.body.pictureID, request.params.eventID]);
});

//Get all events for organizer
app.get("/api/events/organizer/:organizerID", (request, response) => {
    console.log("Express: Request to get all events for organizer " + request.params.organizerID);
    eventDao.getAllForOrganizer((status, data) => {
        response.status(status);
        response.json(data);
    }, request.params.organizerID);
});

//TODO: Check if this endpoint works with localStorage
//Get all events by status
app.get("/api/events/status/:status", (request, response) => {
    console.log("Express: Request to get all events for organizer " + CookieStore.currentUserID + " with status " + request.params.status);
    eventDao.getByStatusForOrganizer((status, data) => {
        response.status(status);
        response.json(data);
    }, request.params.status, CookieStore.currentUserID);
});

//Delete an event
app.delete("/api/events/:eventID", (request, response) => {
    console.log("Express: Request to delete event " + request.params.eventID);
    eventDao.deleteOne((status, data) => {
        response.status(status);
        response.json(data);
    }, request.params.eventID);
});

//Change event status
app.put("/api/events/:eventID/status/:status", (request, response) => {
    console.log("Express: request to archive event " + request.params.eventID);
    eventDao.setStatus((status, data) => {
        response.status(status);
        response.json(data);
    }, request.params.eventID, request.params.status);
});

//Get number of events with status
app.get("/api/events/status/:status/amount", (request, response) => {
    console.log("Express: request to get number of elements with status " + request.params.status + " for organizer " + CookieStore.currentUserID);
    eventDao.getNumberOfStatusForOrganizer((status, data) => {
        response.status(status);
        response.json(data);
    }, request.params.status, CookieStore.currentUserID);
});

//TODO: Check if this is necessary
//Get X events with status after date
app.get("/api/events/status/:status/:amount/:date", (request, response) => {
    console.log("Express: request to get " + request.params.amount + " elements with status " + request.params.status + " after date " + request.params.date + " for organizer " + CookieStore.currentUserID);
    eventDao.getXOfStatusAfterDateForOrganizer((status, data) => {
        response.status(status);
        response.json(data);
    }, request.params.status, request.params.amount, request.params.date, CookieStore.currentUserID);
});

//Get all artists for event
app.get("/api/events/:eventID/artists", (request, response) => {
    console.log("Express: request to get all artists for event " + request.params.eventID);
    eventDao.getAllArtists((status, data) => {
        response.status(status);
        response.json(data);
    }, request.params.eventID);
});

//Add a document to event
app.put("/api/events/:eventID/documents/:documentID", (request, response) => {
    console.log("Express: request to add a document " + request.params.documentID + "to event " + request.params.eventID);
    eventDao.addDocument((status, data) => {
        response.status(status);
        response.json(data);
    }, request.params.eventID, request.params.documentID);
});
