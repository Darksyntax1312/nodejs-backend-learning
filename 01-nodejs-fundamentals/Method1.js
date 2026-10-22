// This is the first method to create a server.

const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req);
  // res.end("Hii this is the first request i am sending from this server.")
  if (req.url === "/data") {
    res.end(
      " Connection established. Welcome to Nexorithm.You have successfully routed through the digital ether to reach this newly minted node. Born from raw logic, configurations, and a passion for building, this server stands ready to process your requests, store your data, and power the next generation of ideas.Server Status: Online & Radiating Potential The journey into the architecture of tomorrow begins right here.",
    );
  }
  else if(req.url === "/users"){
    res.end("This is the first request i am sending from this server.");
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
