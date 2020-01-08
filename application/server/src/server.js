var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var cors = require('cors');
var app = express();
var path = require('path');
var multer = require('multer');
var fs = require('fs');

var resourcePath = __dirname + "/../../client/public";



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
/*const resource_path = path.join(__dirname, '/../../client/public/resources');

function createFoldersForUser(eventID, documentCategoryIDs) {
    fs.mkdirSync( resource_path + '/' + eventID);
    for(let i = 0; i < documentCategoryIDs.length; i++){
        fs.mkdirSync( resource_path + '/' + eventID + "/" + documentCategoryIDs[i]);
    }
}
const testID = 1;
const test = [1,2,3];
createFoldersForUser(testID, test);
*/

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, public_path + "/resources/");
    },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

var upload = multer({ storage: storage });

app.post('/single', upload.single('profile'), (req, res) => {
    try {
        res.send(req.file);
    }catch(err) {
        res.send(400);
    }
});


const Documentationdao = require("./dao/documentationdao.js");
let documentationDao = new Documentationdao(pool);
app.get("/documents", (req, res) => {
    console.log("/news: fikk request fra klient");
    newsDao.getAllDocuments((status, data) => {
        res.status(status);
        res.json(data);
    });
});



const Newsdao = require("./dao/newsdao.js");
let newsDao = new Newsdao(pool);

app.get("/news", (req, res) => {
    console.log("/news: fikk request fra klient");
    newsDao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    });
});

