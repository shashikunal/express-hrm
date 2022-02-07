const express = require("express");
const { connect } = require("mongoose");
const { engine } = require("express-handlebars");
const Handlebars = require("handlebars");
var methodOverride = require("method-override");
const { PORT, MONGODB_URL } = require("./config");
const { join } = require("path");
//import all routing module
const EmployeeRoute = require("./Route/employee");
const app = express();

//! ==================database connection STARTS here=======================//
let DatabaseConnection = async () => {
  await connect(MONGODB_URL);
  console.log("Database connected");
};
DatabaseConnection();
//! ==================database connection ENDS here=======================//

//? todo TEMPLATE ENGINE MIDDLEWARE STARTS HERE=============================//
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
//? todo TEMPLATE ENGINE MIDDLEWARE ENDS HERE=============================//

//?  ===========BUILT-IN MIDDLEWARE STARTS HERE=============================//
app.use(express.static(join(__dirname, "public")));
app.use(express.static(join(__dirname, "node_modules")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
//?  ===========BUILT-IN MIDDLEWARE ENDS HERE=============================//

//HANDLEBARS HELPER CLASSES
Handlebars.registerHelper("trimFirst6Char", function (passedString) {
  var theString = passedString.slice(6);
  return new Handlebars.SafeString(theString);
});

app.use("/employee", EmployeeRoute);
//listen port
app.listen(PORT, err => {
  if (err) throw err;
  console.log(`App is running on PORT number ${PORT}`);
});
