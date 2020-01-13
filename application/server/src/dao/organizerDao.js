const Dao = require('./dao.js');

module.exports = class documentDao extends Dao {

    getOne(callback, organizerID) {
        super.query('SELECT * FROM organizer JOIN contact ON organizer.contactID = contact.contactID JOIN picture ON organizer.pictureID = picture.pictureID WHERE organizerID = 1', [organizerID], callback);
    }

    createOne(callback, list) {
        super.query('INSERT INTO organizer VALUES (default, ?, ?, default, ?)', list, callback);
    }

    changePassword(callback, list) {
        super.query('UPDATE organizer SET password = ? WHERE organizerID = ?', list, callback);
    }

    getAllDocuments(callback, organizerID) {
        super.query('SELECT * FROM organizer JOIN event ON organizer.organizerID = event.organizerID JOIN document ON organizer.organizerID = document.documentID WHERE organizer.organizerID = ?', [organizerID], callback);
    }

    getAllEvents(callback, organizerID) {
        super.query('SELECT * FROM organizer JOIN event ON organizer.organizerID = event.organizerID WHERE organizer.organizerID = ?', [organizerID], callback);
    }


    changeUsername(list, callback){
        super.query('UPDATE organizer SET username = ? WHERE organizerID = ?', list ,callback)
    }

    getOrganizerFromEmail(email, callback){
        super.query("select organizer.organizerID from organizer join contact c on organizer.contactID = c.contactID where c.email = ?", [email], callback);
    }


//TODO: må lages picture dao og endepunker - flytt denne til pictureDao
    changeOrganizerProfilePicture(callback, pictureID, pictureLink){
        super.query('update picture set pictureLink = ? where pictureID = ?', [pictureLink, pictureID], callback)
    }

};