const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

/* MYSQL CONNECTION */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Srija@1706",
  database: "internship_db"
});

/* CONNECT DATABASE */
db.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL:", err.message);
  } else {
    console.log("MySQL Connected successfully");
  }
});

/* FORM SUBMIT API */
app.post("/apply", (req, res) => {
  const {
    name,
    email,
    phone,
    degree,
    domain,
    months,
    mode,
    comments
  } = req.body;

  const sql = `
  INSERT INTO internship_applications
  (name, email, phone, degree, domain_name, months, mode, comments)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      name,
      email,
      phone,
      degree,
      domain,
      months,
      mode,
      comments
    ],
    (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        res.status(500).json({
          message: "Database Error - Failed to save enrollment details"
        });
      } else {
        res.json({
          message: "Application Submitted Successfully"
        });
      }
    }
  );
});

/* SERVER */
app.listen(5000, () => {
  console.log("Server Running On Port 5000");
});
