const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  favourite: Boolean,
});

const Contact = model("contact", contactSchema);

module.exports = Contact;
