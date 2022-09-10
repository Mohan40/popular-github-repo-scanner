// Server file

import { app } from "./app.js";

// To specify a port before running the server, use "PORT={port_number} node index.js"
// Ex: To specify port 8080, use "PORT=8080 node index.js"
const PORT = process.env.PORT || 443;

app.listen(PORT, (error) => {
  if (error) {
    console.log("Error: ", error);
  }
  console.log("Server is running on port 443...");
});
