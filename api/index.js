const express = require("express");
const cors = require("cors");
require("dotenv").config();
//const connectDB = require("../config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("welcome to song API");
});

app.post("/signup", async (req, res) => {
  const { name } = req.body.input;
  return res.json({
    name: name,
  });
});

// const fetch = require("node-fetch").default;

// const HASURA_OPERATION = `
// mutation
// ($firstname:String,
//   $lastname:String,
//   $email:String,
//   $password:String,
//   $id:Int) {
//   insert_users_one(
//     object: {
//       email: $email,
//       firstname: $firstname,
//       lastname: $lastname,
//       id: $id,
//       password: $password}
//   ) {
//     email
//     firstname
//     id
//     lastname
//     password
//   }
// }
// `;

// // execute the parent operation in Hasura
// const execute = async (variables) => {
//   const fetchResponse = await fetch("https://kaleab.hasura.app/v1/graphql", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "x-hasura-admin-secret":
//         "mnPUv2pIIEEoT3I6OBsIIUNLwwCRFZigB0tE8u21tRLKrGaezoIg2I3d8QSBc7vH",
//     },
//     body: JSON.stringify({
//       query: HASURA_OPERATION,
//       variables,
//     }),
//   });
//   const data = await fetchResponse.json();
//   console.log("DEBUG: ", data);
//   return data;
// };

// // Request Handler
// app.post("/register", async (req, res) => {
//   // get request input
//   const { firstname, lastname, email, password, id } = req.body.input;

//   // run some business logic

//   // execute the Hasura operation
//   const { data, errors } = await execute({
//     firstname,
//     lastname,
//     email,
//     password,
//     id,
//   });

//   // if Hasura operation errors, then throw error
//   if (errors) {
//     return res.status(400).json(errors[0]);
//   }

//   // success
//   return res.json({
//     ...data.insert_users_one,
//     token: "my-token",
//   });
// });
// // app.use("/api", require("../routes/songRoute"));

// ////////////////////////////////////////////////////////////////////////

const HASURA_OPERATION = `
mutation Register(
  $firstname: String,
  $lastname: String,
  $email: String,
  $password: String
) {
  insert_user_one(object: {
    firstname: $firstname,
    lastname: $lastname,
    email: $email,
    password: $password
  }) {
    id
    firstname
    lastname
    password
    email
    created_at
  }
}
`;

// execute the parent operation in Hasura
const execute = async (variables) => {
  const fetchResponse = await fetch(
    "https://foodrecipe-minlab.hasura.app/v1/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
          "FV3YGvvYSM5qACsePMZBr7YMBJqehx4jzKmFqtoRRkLVtvVMGADLo315227YEXbq",
      },
      body: JSON.stringify({
        query: HASURA_OPERATION,
        variables,
      }),
    }
  );
  const data = await fetchResponse.json();
  console.log("DEBUG: ", data);
  return data;
};

// Request Handler
app.post("/Register", async (req, res) => {
  // get request input
  const { firstname, lastname, email, password } = req.body.input;

  // execute the Hasura operation
  const { data, errors } = await execute({
    firstname,
    lastname,
    email,
    password,
  });

  // if Hasura operation errors, then throw error
  if (errors) {
    return res.status(400).json(errors[0]);
  }

  // success
  return res.json({
    ...data.insert_user_one,
    token: "my-token",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // connectDB();
  console.log(`app running on port ${PORT}`);
});
