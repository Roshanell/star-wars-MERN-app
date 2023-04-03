// require express
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
// Body-parser is a middleware. They help to tidy up the request object before we use them. Express lets us use middleware with the use method.
// The urlencoded method within body-parser tells body-parser to extract data from the <form> element and add them to the body property in the request object.
app.use(bodyParser.urlencoded({ extended: true }));

const MongoClient = require("mongodb").MongoClient;
let dbConnectionString = process.env.DB_String,
	dbName = "star-wars",
	collection;
// allows us to connect to Mongo's client
MongoClient.connect(dbConnectionString)
	//allows us to connect to mongodb. Pass the connection string so it knows what DB to use
	.then((client) => {
		console.log("Connected to Database");
		db = client.db(dbName);
		collection = db.collection("quotes");
	});

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
	console.log(__dirname);
	// Note: __dirname is the current directory you're in. Try logging it and see what you get!
});

app.post("/quotes", (req, res) => {
	console.log(req.body);
});
/// creates a server that the browser can connect to
app.listen(3000, function () {
	console.log("listening on 3000");
});
