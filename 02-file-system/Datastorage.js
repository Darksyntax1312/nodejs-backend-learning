const fs = require("fs");

// importing id creator to create unique id everytime a new home is created

const { randomUUID } = require("crypto");

class Product {
  constructor(Name, Price, Location, Rating, PhoneNumber, Details) {
    this.id = randomUUID();
    this.Name = Name;
    this.Price = Price;
    this.Location = Location;
    this.Rating = Rating;
    this.PhoneNumber = PhoneNumber;
    this.details = Details;
  }

  // Saving data to database

  save() {
    // // Read existing data before adding a new product to print the data which are already available

    fs.readFile("Newfile.txt", (err, data) => {
      let existingData = [];

      // if there will be any error except file missing then log that error and

      if (err) {
        if (err.code !== "ENOENT") {
          console.log(err);
          return;
        }
      }

      // if the data is not empty and exist then parse the data and send it to my array
      else if (data.length > 0) {
        try {
          // console.log("Fetching user recent data");
          existingData = JSON.parse(data);
        } catch (err) {
          console.log("Invalid JSON:", err);
          return;
        }
      }

      // push the new value on the array already containing the old value or empty
      // console.log("Adding new data");
      if (Array.isArray(existingData)) {
        existingData.push(this);
      } else {
        console.log("Stored data is not an array.");
        return;
      }

      // Write the data back to the file with the new and old value by converting it into string.

      fs.writeFile("Newfile.txt", JSON.stringify(existingData), (err) => {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log("File written successfully!");
        }
      });
    });
  }

  // Reading Databse

  static fetchAll(callback) {
    fs.readFile("Newfile.txt", (err, data) => {
      // if there will be any error except file missing then log that error and

      if (err) {
        if (err.code === "ENOENT") {
          return callback(null, []);
        }
        return callback(err);
      }

      // if the data is not empty and exist then parse the data and send it to my array
      else if (data.length > 0) {
        try {
          // console.log("Fetching user recent data");
          const items = JSON.parse(data);

          if (Array.isArray(items)) {
            callback(null, items);
          } else {
            callback(new Error("Stored data is not an array"));
          }
        } catch (err) {
          console.log("Invalid JSON:", err);
          callback(err);
          return;
        }
      } else if (data.length === 0) {
        return callback(null, []);
      }
    });
  }

  // Updating the id

  static updateById(id, updates, callback) {
    fs.readFile("Newfile.txt", (err, data) => {
      if (err) return callback(err);
      let homes;
      try {
        homes = JSON.parse(data);
      } catch (parseErr) {
        return callback(parseErr);
      }
      const home = homes.find((item) => String(item.id) === String(id));
      if (!home) return callback(null, null);
      if (updates.Name !== home.Name) {
        home.Name = updates.Name;
      }
      if (updates.Price !== home.Price) {
        home.Price = updates.Price;
      }
      if (updates.Location !== home.Location) {
        home.Location = updates.Location;
      }
      if (updates.Rating !== home.Rating) {
        home.Rating = updates.Rating;
      }
      if (updates.PhoneNumber !== home.PhoneNumber) {
        home.PhoneNumber = updates.PhoneNumber;
      }
      if (updates.Details !== home.details) {
        home.details = updates.Details;
      }
      fs.writeFile("Newfile.txt", JSON.stringify(homes), (writeErr) => {
        if (writeErr) return callback(writeErr);
        callback(null, home);
      });
    });
  }
  // Deleting a Home

  static deleteHome(id, callback) {
    fs.readFile("Newfile.txt", (err, data) => {
      if (err) return callback(err);
      let homes;
      try {
        homes = JSON.parse(data);
      } catch (parseErr) {
        return callback(parseErr);
      }
      const home = homes.filter((item) => String(item.id) !== String(id));
      if (home.length === homes.length) {
        return callback(null, null);
      }

      fs.writeFile("Newfile.txt", JSON.stringify(home), (err) => {
        if (err) return callback(err);
        callback(null, home);
      });
    });
  }
}

module.exports = Product;
