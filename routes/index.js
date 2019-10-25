const express = require("express");
const fileHandler = require("fs");
const router = express.Router();
const app = express();
var jsonfile = require("jsonfile");
const webData = require("../my_work.json");

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get("/api", (req, res) => res.json(webData));

router.post("/api", (req, res) => {
  const Items = webData;
  const AddData = `{id: "${req.query.id}",title :"${req.query.title}",description:"${req.query.description}",URL : "${req.query.URL}"}`;
  // const dataAdded = Items.push(AddData);
  fileHandler.appendFile("my_work.json", AddData, err => {
    if (err) throw err;
    res.send("File created!");
  });
  console.log(Items);
  console.log();
});

router.put("/api/:id", (req, res) => {
  var idName = req.params.id;
  var titleName = req.body.fname;
  var descriptionName = req.body.lname;

  jsonfile.readFile("my_work.json", (err, data) => {
    var fileObj = data;

    fileObj.users_array.map(curr => {
      if (curr.id == idName) {
        curr.title = titleName;
        curr.description = descriptionName;
      }
    });

    jsonfile.writeFile("my_work.json", fileObj, err => {
      if (err) throw err;
    });
  });
});

router.delete("/api/:id", (req, res) => {
  let deleteId = req.params.id; //Get the id through req.params.id of the object you are going to delete
  let deleteObj = userJson.find(user => user.id == deleteId); // As you have only Id of the object, we want to get the entire object from the array. find() will fetch the object from the array whose id is equal to deleteId and assign it to deleteObj.
  let deleteIndex = userJson.indexOf(deleteObj); //Find the index of the object fetched from the JSON array.
  userJson.splice(deleteIndex, 1); // Splice/ remove the object from the JSON Array.
  res.send(deleteObj); // Send the deleted object as response.
});

module.exports = router;
