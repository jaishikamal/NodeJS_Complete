const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

// Path for JSON file
const filePath = path.join(rootDir, "data", "homes.json");

module.exports = class Home {
  constructor(homeName, price, location, rating, photoURL) {
    this.homeName = homeName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoURL = photoURL;
  }

  save() {
    Home.fetchAll((homes) => {
      homes.push(this);
      fs.writeFile(filePath, JSON.stringify(homes), (err) => {
        if (err) {
          console.log("Error saving home:", err);
        }
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        // file does not exist or reading failed → return empty array
        callback([]);
      } else {
        try {
          callback(JSON.parse(data));
        } catch (e) {
          console.log("JSON parse error:", e);
          callback([]);
        }
      }
    });
  }
};
