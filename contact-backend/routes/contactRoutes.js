const express = require("express");
const router = express.Router();
const {getContacts, updateContact, createContact, getContact, deleteContact} = require("../controllers/contactController");
const validateToken = require("../middleware/validateToken");


//require validtaion
router.use(validateToken);
//getting all contacts and creating new contact
router.route("/").get(getContacts).post(createContact)
//get, update and delete a single contact
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);


//export the router
module.exports = router;