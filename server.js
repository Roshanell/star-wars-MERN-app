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
		app.use(bodyParser.urlencoded({ extended: true }));


		app.get("/", (req, res) => {
			const cursor = db.collection("quotes").find();
			console.log(cursor);
			db.collection("quotes")
				.find()
				.toArray()
				.then((results) => {
					console.log(results);
				})
				.catch((error) => console.error(error));
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
