const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const fs = require("fs");
const twilio = require("twilio");
const path = require("path");

require("dotenv").config();


const accountSid = process.env.TWILIO_ACCOUNT;
const authToken = process.env.TWILIO_TOKEN;
let client = new twilio(accountSid, authToken);

const port = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());

//MESSAGE
app.get("/", (req, res) => { 
  res.send("server running");
});

// MySQL Settings
const db = mysql.createConnection({
  host: "db-mysql-fra1-83117-do-user-10299819-0.b.db.ondigitalocean.com",
  user: "doadmin",
  password: "secretpassword",
  database: "defaultdb",
  port: 25060,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("ca_cert.crt"),
  },
});


db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// NodeMailer Settings
let transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

let listContacts = "";

// Runs once every day at 08:00:00
cron.schedule(" 00 00 08 * * * ", () => {
  console.log("Tidsbestämt anrop utförs nu..");

  db.query(
    "SELECT name, phone, email, selection, TIMESTAMP FROM contacts WHERE sent IS NULL",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log("Antal nya kontakter:" + result.length);
      if (result.length > 0) {
        listContacts = ""; 

        for (let i = 0; i < result.length; i++) {
          listContacts += `
          <tr>
            <td> ${result[i].name}</td>
            <td> <a href="mailto:${result[i].email}">${result[i].email}</a> </td>
            <td> <a href="tel:${result[i].phone}">${result[i].phone}</a> </td>
            <td> ${result[i].selection} </td>
            <td> ${result[i].TIMESTAMP}</td> 
          </tr>
           `;
        }

        let mailOptions = {
          from: "attbygga@hotmail.com",
          // ADD mail-receiver here
          to: "",
          subject: "Dagsrapport - AttBygga AB",
          html: `
          <style>
          table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }
          td, th {
            border: 1px solid #dddddd; 
            padding: 8px;
          }
            h1 { text-align:center; font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; }
          </style>
          <table>
            <th style="border: none">
              <img src="cid:ATTBYGGA" />
            </th>
          </table>
          <h1>Mailrapport av nya kontakter</h1>
          <h3>Nya personer som vill bli kontaktade:</h3>
          <table>
            <tr>
            <th style="text-align: left;" >Namn</th>
            <th style="text-align: left;" >Email</th>
            <th style="text-align: left;" >Tel</th>
            <th style="text-align: left;" >Kontaktval</th>
            <th style="text-align: left;" >Datum</th> 
          </tr> 
          ${listContacts}
          </table>`,

          attachments: [
            {
              filename: "logo.png",
              path: path.join(__dirname, '../images/logo.png'),
              cid: "ATTBYGGA",
            },
          ],
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);

            db.query(
              "UPDATE contacts SET sent = current_timestamp() WHERE sent IS NULL",
              (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log(
                  `Changed ${result.changedRows} rows at column 'sent'`
                );
              }
            );
          }
        });
      }
    }
  );
});

// ENDPOINTS
//********* */

// POST - localhost:8001/create/contact
app.post("/create/contact", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const contactThrough = req.body.contactThrough;

  db.query(
    "INSERT INTO contacts (name, email, phone, selection) VALUES (?,?,?,?)",
    [name, email, phone, contactThrough],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("POST request successfully done!");

        client.messages
          .create({
            body: "Tack för att du villa komma i kontakt med oss. Vi har tagit emot ditt formulär och återkommer till dig snarast. Med vänliga hälsningar, ATT BYGGA AB",
            from: process.env.TWILIO_FROM,

            // ADD Correct the number here
            to: phone,
          })
          .then(message => console.log(message.sid))
      }
    }
  );
  return res.status(201).send("Post request done");
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}!`);
});
