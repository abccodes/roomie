const { MongoClient, ServerApiVersion } = require("mongodb");
import * as dotenv from "dotenv";

dotenv.config();

console.log("CHECK ", process.env.MONGO_URI);
const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
console.log("URI, ", uri);
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// import express, {
//   NextFunction,
//   Request,
//   RequestHandler,
//   Response,
// } from "express";
// import cors from "cors";
// import { plainToClass } from "class-transformer";
// import { RequestBody, ResponseBody } from "common";
// import { validate } from "class-validator";
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://abayercalvert:<password>@rommie.zk2x6xq.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function start() {
//   try {
//     const app = express();

//     await client.connect();

//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");

//     const path = require("path");

//     // Enable cors to be able to reach the backend on localhost:8080 while running React.js in dev mode on localhost:3000
//     // You might want to disbale this on production.
//     app.use(cors());
//     app.use(express.json() as RequestHandler);

//     app.post("/api", async function(req: Request, res: Response) {
//       let body = plainToClass(RequestBody, req.body as Object);
//       let validationErrors = await validate(body);
//       if (validationErrors.length == 0) {
//         const responseBody: ResponseBody = new ResponseBody(
//           "Hello, " + body.name
//         );
//         res.contentType("application/json");
//         res.status(200);
//         res.send(responseBody);
//       } else {
//         res.sendStatus(400);
//       }
//     });

//     // This code makes sure that any request that does not matches a static file
//     // in the build folder, will just serve index.html. Client side routing is
//     // going to make sure that the correct content will be loaded.
//     app.use((req: Request, res: Response, next: NextFunction) => {
//       if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
//         next();
//       } else {
//         res.header(
//           "Cache-Control",
//           "private, no-cache, no-store, must-revalidate"
//         );
//         res.header("Expires", "-1");
//         res.header("Pragma", "no-cache");
//         res.sendFile(path.join(__dirname, "build", "index.html"));
//       }
//     });

//     app.use(express.static(path.join(__dirname, "build")));

//     // Start the server
//     const PORT = process.env.PORT || 8080;
//     app.listen(PORT, () => {
//       console.log(`App listening on port ${PORT}`);
//       console.log("Press Ctrl+C to quit.");
//     });
//   } catch (e) {
//     console.error(e);
//   }
// }
