import express from "express";
import dotenv from "dotenv";
import { notFound } from "./src/middlewares/notFound.js";
import { handleError } from "./src/middlewares/handleError.js";
import notesRoute from "./src/resources/notes/notes.routes.js";
import cors from "cors";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// const corsOptions = {
//   origin: "http://localhost:5001", // for vite application
//   optionsSuccessStatus: 200,
// };

app.use(cors(), function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//middleware
// app.use(cors(corsOptions));
app.use(express.json());

// api routes
app.use("/notes", notesRoute);

app.use(notFound);
app.use(handleError);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});