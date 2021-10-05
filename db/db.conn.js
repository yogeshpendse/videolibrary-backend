const mongoose = require("mongoose");
async function dbconnection(uri) {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection to DB Successful");
  } catch (error) {
    console.log(error);
    console.log(error.message);
    console.log("Connection to DB Failed");
  }
}

module.exports = { dbconnection };
