const express = require("express"); //this imports the express module
const app = express();
const router = express.Router();
const fileHandler = require("fs");
var pro = require("./my_work.json"); //this imports the json file
//the cors is a mechanism to let a user-agent resources from a domain outside of the domain from which the first resource was saved.
var cors = require("cors");
app.use(cors());
//this is the app.get function that gets the info from the json file to be displayed on postman

app.get("/api", function (req, res) {
  fileHandler.readFile("my_work.json", (err, data) => {
    if (err) res.send("File not found. First post to create file.");
    else res.send(pro); //this send the data stored in the json file to the html body
  });
});
//this is the app.post function that lets the user add more to the json file using postman
// app.post("/api", (req, res) => {
//   let data = {
//     id: `${req.query.id}`,
//     title: `${req.query.title}`,
//     description: `${req.query.description}`,
//     url: `${req.query.url}`
//   };
//   pro.push(data); //this pushes the data the user enters on postman to the json file
//   fileHandler.writeFile("my_work.json", JSON.stringify(pro), err => {
//     if (err) throw err;
//     res.send("File created!");
//   });
// });
// let data = JSON.parse(fileHandler.readFileSync("my_work.json"));
app.post("/api", (req, res) => {

  const AddData = {
    id: `${req.query.id}`,
    title: `${req.query.title}`,
    description: `${req.query.description}`,
    url: `${req.query.url}`
  };
  pro.push(AddData);
  fileHandler.writeFile("my_work.json", JSON.stringify(pro), err => {
    if (err) throw err;
    res.send("File created!");
  });
  // console.log(Items);
  console.log(AddData)
});

// let data = JSON.parse(fileHandler.readFileSync("my_work.json"));
// app.post("/api", (req, res) => {
//   const newPost = Object.assign(req.body);
//   data = newPost;
//   fileHandler.writeFile("my_work.json", JSON.stringify(data), err =>
//     res.status(281).json({
//       status: "ok",
//       data
//     })
//   );
// });
//this is the app.delete function that lets the user delete a specific id on postman
app.delete("/api", (req, res) => {
  pro = pro.filter(objects => {
    //this is the filter function that filters out which id will be excluded from the file, which in turn deletes it
    return objects.id !== req.query.id;
  });
  fileHandler.writeFile("my_work.json", JSON.stringify(pro), err => {
    if (err) {
      res.send("id not deleted");
    }
    res.send("id deleted");
  });
});
//this is the app.put function that lets the user update the title or description on postman
app.put("/api", (req, res) => {
  //this also puts params in place so that the info can be updated

  const update = {
    id: `${req.query.id}`,
    title: `${req.query.title}`,
    description: `${req.query.description}`,
    url: `${req.query.url}`
  };

  for (var webpro of pro) {
    //this if statements makes if the user decides to leave the description or title empty on postman, then it will not show error and it will stay the same
    if (webpro.id == update.id) {
      if (update.title) {
        webpro.title = update.title;
      }
      if (update.description) {
        webpro.description = update.description;
      }
    }
  }
  fileHandler.writeFile("my_work.json", JSON.stringify(pro), err => {
    if (err) {
      res.send("file not updated");
    }
    res.send("file updated");
  });
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});