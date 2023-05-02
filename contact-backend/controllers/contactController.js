const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels")

//controller for getting all contacts
const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts)
})
 
//the asyncHandler will provide exception handling 
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    console.log("contact")
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    res.status(200).json(contact);
  });

const createContact = asyncHandler(async(req, res) => {
    console.log(req.body)
    const {name, email, phone} = req.body;
    if (!name|| !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    res.status(201).json({contact});
})

const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404); 
        throw new Error("Contact not found");
    }
    //check if other user trying to delete the user
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User has no permision to delete this user contact");
    }
    await Contact.findByIdAndRemove(
        req.params.id,
        );
    res.status(200).json(contact);
})

const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    //check if other user trying to update the user
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User has no permission to update this user contact");
    }
    //update the contact
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );  
    res.status(201).json(updatedContact);
})


module.exports = { getContacts, getContact, updateContact, deleteContact, createContact }; 