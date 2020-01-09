var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var cors = require('cors');
var app = express();
var path = require('path');
var multer = require('multer');
var fs = require('fs');
var EventEmitter = require("events").EventEmitter;
var body = new EventEmitter();


var server = app.listen(8080);


const public_path = path.join(__dirname, '/../../client/public');


app.use(cors());

app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
});

app.use(bodyParser.json());

app.use(express.static(public_path));

var pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "evengu",
    password: "O7KhlwWQ",
    database: "evengu",
    debug: false
});


//----------------- DOCUMENTATION ---------------------
//Check if a folder exists for user
function checkIfFolderExist(name, path) {
    if(name != null){
        //Check folder existence
        if(fs.existsSync(path + name)){
            return true;
        } else {
            return false;
        }
    }
    return false;
}



const resource_path = path.join(__dirname, '/../../client/public/resources/');
var storage = multer.diskStorage({
    //Declaring destination for file
    destination: function(req, file, cb) {
        try{
            //If user folder exist but not document category folder then create and set destination path
            if(checkIfFolderExist(req.params.id, resource_path)){
               if(!checkIfFolderExist(req.params.folderName, resource_path + req.params.id + "/" + req.params.folderName)) {
                   try {
                       fs.mkdirSync(resource_path + req.params.id + "/" + req.params.folderName);
                   } catch (e) {
                       console.log("Error creating document category folder");
                   }
                   cb(null, resource_path + req.params.id + "/" + req.params.folderName);
               }
               //User and document category folder exist. Set destination
               else {
                   cb(null, resource_path + req.params.id + "/" + req.params.folderName);
               }
            }
            //If neither user folder or document category folder exist. Create both
            else {
                try {
                    fs.mkdirSync(resource_path + req.params.id);
                    try {
                        fs.mkdirSync(resource_path + req.params.id + "/" + req.params.folderName );
                        cb(null, resource_path + req.params.id + "/" + req.params.folderName);
                    } catch (e) {
                        console.log("Error creating document category folder");
                    }
                } catch (e) {
                    console.log("Error creating user folder");
                }
            }
        } catch (e) {
            console.log("An error occurred");
        }

    },
    //Adding file to destination
    filename: function (req, file, cb) {
        //Create file in server. If user upload same file append time for unique name
        try{
            if (fs.existsSync(resource_path + req.params.id + '/' + req.params.folderName + "/" + file.originalname)) {
                cb(null, Date.now() + "--" + file.originalname)
            } else {
                cb(null, file.originalname)
            }
        } catch (e) {
            console.log("An error occurred")
        }
    }
});

/*
const resource_path = path.join(__dirname, '/../../client/public/resources/');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        try{
            if (fs.existsSync(resource_path + req.params.id)) {
                console.log('The folder exists.');
            } else {
                fs.mkdirSync( resource_path + req.params.id );
            }
        } catch (e) {
            console.log("An error occurred");
        }
        cb(null, resource_path + req.params.id );

    },
    filename: function (req, file, cb) {
        try{
            if (fs.existsSync(resource_path + req.params.id + '/' + file.originalname)) {
                 cb(null, Date.now() + "--" + file.originalname)
            } else {
                cb(null, file.originalname)
            }
        } catch (e) {
            console.log("An error occurred")
        }
    }
});*/


var upload = multer({ storage: storage });


//Post request for uploading multiple files
app.post('/upload/:id/:folderName', upload.array('file', 10), (req, res) => {
    try {
        res.send(req.files);
    }catch(err) {
        res.send(400);
    }
});


const Documentationdao = require("./dao/documentationdao.js");
let documentationDao = new Documentationdao(pool);

/*
app.post("/upload/:eventID", (req, res) => {
    console.log("Fikk POST-request fra klienten");
    documentationDao.insertDocument(req.params.eventID, req.params.folderName, req.body,(status, data) => {
        res.status(status);
        res.json(data);
    });
});*/

app.get("/test/allDoc", (req, res) => {
    console.log("/doc: fikk request fra klient");
    documentationDao.getAllDocuments((status, data) => {
        res.status(status);
        res.json(data);
    });
});


app.get("/test", (req, res) => {
    console.log("/doc: fikk request fra klient");
    documentationDao.getAllDocumentCategories((status, data) => {
        res.status(status);
        res.json(data);
        body.data = data;
        body.emit('update');
    });
});

body.on('update', function () {
    console.log(body.data); // HOORAY! THIS WORKS!
});







