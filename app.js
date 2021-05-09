const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/People-API", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const personSchema = {
  id: String,
  firstName: String,
  lastName: String,
  email: String,
};

const Person = mongoose.model("Person", personSchema);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
/////////////////////////////////
app.get("/people", (req, res) => {
  Person.find({}, (err, people) => {
    if (!err) {
      res.send(people);
    } else {
      console.log(err);
    }
  });
});

app.post("/people", (req, res) => {
  const toAddPerson = new Person({
    id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });

  toAddPerson.save((err) => {
    if (!err) {
      res.send("Added succesffuly");
    } else {
      res.send(err);
    }
  });
});
/////////////
app.get("/people/:personID", (req, res) => {
  Person.find({ id: req.params.personID }, (err, foundPerson) => {
    if (foundPerson) {
      res.send(foundPerson);
    } else {
      res.send(err);
    }
  });
});

app.put("/people/:personID", (req, res) => {
  Person.replaceOne(
    { id: req.params.personID },
    {
      id: req.body.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    },
    function (err) {
      if (!err) {
        res.send("Successfully updated person!");
      } else {
        res.send(err);
      }
    }
  );
});

app.patch("/people/:personID", (req, res) => {
  Person.replaceOne(
    { id: req.params.personID },
    {
      id: req.body.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    },
    function (err) {
      if (!err) {
        res.send("Successfully updated person!");
      } else {
        res.send(err);
      }
    }
  );
});

app.delete("/people/:personID", (req, res) => {
  Person.deleteOne({ id: req.params.personID }, function (err) {
    if (!err) {
      res.send("Deleted the person with id: " + req.params.id + ".");
    } else {
      res.send(err);
    }
  });
});

app.listen(3000, () => {
  console.log(`App listening at http://localhost:3000`);
});
