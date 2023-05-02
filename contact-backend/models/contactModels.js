const mongoose = require("mongoose");

//create a schema with mongoose
const contactSchema = mongoose.Schema( {
    //define the schema
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String, //define the type
        required: [true, "Please add the contact name"], //define if required
    },
    email: {
        type: String,
        required: [true, "Please add the contact email"],
    },
    phone: {
        type: String,
        required: [true, "Please add the contact phone number"],
    },
    
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Contact", contactSchema);