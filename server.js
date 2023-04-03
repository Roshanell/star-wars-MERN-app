// require express
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();
require("dotenv").config();

const dbConnectionString = process.env.DB_String;

MongoClient.connect(dbConnectionString, { useUnifiedTopology: true })
	//allows us to connect to mongodb. Pass the connection string so it knows what DB to use
	.then((client) => {
		const dbName = "star-wars";
		const db = client.db(dbName);
		const quotesCollection = db.collection("quotes");
		console.log(`Connected to Database ${dbName}`);

		// middleware
		// Body-parser is a middleware. They help to tidy up the request object before we use them. Express lets us use middleware with the use method.
		// The urlencoded method within body-parser tells body-parser to extract data from the <form> element and add them to the body property in the request object.
		app.use(bodyParser.urlencoded({ extended: true }));

		app.get("/", (req, res) => {
			res.sendFile(__dirname + "/index.html");
			//console.log(__dirname);
			// Note: __dirname is the current directory you're in. Try logging it and see what you get!
		});

		app.post("/quotes", (req, res) => {
			quotesCollection
				.insertOne(req.body)
				.then((result) => {
					console.log(result);
					res.redirect("/");
				})
				.catch((error) => console.error(error));
		});
		/// creates a server that the browser can connect to
		app.listen(3000, function () {
			console.log("listening on 3000");
		});
	})
	.catch((error) => console.error(error));
