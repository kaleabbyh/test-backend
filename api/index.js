const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//const connectDB = require("../config/db");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("welcome to Food Recipe API");
});

app.post("/signup", async (req, res) => {
  const { name } = req.body.input;
  return res.json({
    name: name,
  });
});

//app.use("/api", require("../routes/songRoute"));
//////////////////////////////////////////////////////////////////////////
//Register

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

app.post("/Register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body.input;
  const hashedPassword = await bcrypt.hash(password, 10);
  const { data, errors } = await execute({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  if (errors) {
    return res.status(400).json(errors[0]);
  }

  return res.json({
    ...data.insert_user_one,
    token: generateToken(data?.insert_user_one?.id),
  });
});

/////////////////////////////////////////////////////////////
//Login

const LOGIN_HASURA_OPERATION = `
query login(
		$email:String
    ) 
    {
  user(where: {email: {_eq: $email}}) {
     id
    firstname
    email
    lastname
    password
  }
}
`;

// execute the parent operation in Hasura
const login_execute = async (variables) => {
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
        query: LOGIN_HASURA_OPERATION,
        variables,
      }),
    }
  );
  const data = await fetchResponse.json();
  console.log("DEBUG: ", data);
  return data;
};

// Request Handler
app.post("/Login", async (req, res) => {
  const { email, password } = req.body.input;
  const { data, errors } = await login_execute({ email });

  if (errors || !data || !data.user || data.user.length === 0) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, data.user[0].password);

  if (isPasswordValid) {
    const token = generateToken(data.user[0].id);
    return res.json({
      ...data.user[0],
      token: token,
    });
  } else {
    // Handle invalid password case
    return res.status(401).json({ error: "Invalid  password" });
  }
});

//generate token
const generateToken = (id) => {
  const tokenPayload = {
    id,
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": ["user", "admin"],
      "x-hasura-default-role": "user",
      "x-hasura-user-id": id,
    },
  };

  const token = jwt.sign(tokenPayload, "kaleab", {
    expiresIn: "1d",
  });

  return token;
};

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // connectDB();
  console.log(`app running on port ${PORT}`);
});
