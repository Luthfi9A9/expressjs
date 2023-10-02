// import library expressjs
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express(); //call function expressjs

app.use(bodyParser.json()); // for parsing application/json
app.use(cors());

// create logger middleware function
function LoggerMiddleware(req, res, next) {
  console.log(`request received at: ${new Date()}`);

  next(); // continue process next function
}
// app.use(LoggerMiddleware);

// create http method get all customers
app.get("/api/customers", (req, res) => {
  const { keyword, category, limit } = req.query; //request query string by keyword, category limit

  res.status(200).json({
    code: 200,
    message: "get data berhasil",
    data: [
      {
        name: "atlas",
        email: "atlas@gmail.com",
        role: "Tank",
      },
      {
        name: "parsha",
        email: "parsha@gmail.com",
        role: "Mage",
      },
      {
        name: "helcrut",
        email: "helcrut@gmail.com",
        role: "assasin",
      },
      {
        name: "layla",
        email: "layla@gmail.com",
        role: "Marksman",
      },
      {
        name: "xborg",
        email: "xborg@gmail.com",
        role: "fighter",
      },
    ],
    pagination: {
      total_record: 100,
      current_page: 1,
      total_page: limit,
    },
    search: {
      keyword: keyword,
      category: category,
    },
  });
});

// create handling http POST for add Customer
app.post("/api/customers", LoggerMiddleware, (req, res) => {
  console.log(req.body);
  const { name, email, role } = req.body;

  // res.send(
  //   `Thank you, ${name} with email: ${email} and role: ${role} we have received your submission`
  // );
  res.status(201).json({
    message: "create data customers successfully",
    data: {
      name: name,
      email: email,
      role: role,
    },
  });
});

// create http method get detail customers
app.get("/api/customers/:id", (req, res) => {
  const customerID = req.params.id; // request params by id customers

  res.status(200).json({
    message: "get success",
    data: {
      customerID: customerID,
      name: "atlas",
      email: "atlas@gmail.com",
      role: "Tank",
    },
  });
});

const PORT = 3000; // define variable port on 3000
app.listen(PORT, () => {
  console.log(`App is Listening on port ${PORT} `);
});
