// Require mongoose
const mongoose = require('mongoose');

/// connection function
const DataBaseConnection = () => {

    // Take PORT from .env file
    const Database_url = process.env.URL;

    mongoose.connect(Database_url); 

    const Db = mongoose.connection; 
    
    // Connection status with event handler (I have to perform api call so i prefer event handler at place of try catch block)
    Db.on("error", console.error.bind("Databse connection failed"))
    Db.once("open", function(){
        console.log("Db cconnection success")
    })
        
}

module.exports = DataBaseConnection