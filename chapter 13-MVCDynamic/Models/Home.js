const fs =require('fs');
const path = require('path');
const rootDir = require('../util/path');




// fake database
const registeredHomes = [];

module.exports = class Home {
  constructor(homeName, price, location, rating, photoURL) {
    this.homeName = homeName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoURL = photoURL;
  }

  save() {
    registeredHomes.push(this);
    const filePath = path.join(rootDir, "data", "homes.json");
    fs.writeFileSync(filePath, JSON.stringify(registeredHomes),(err)=>{console.log(err)});
  }

  static fetchAll() {
    return registeredHomes;
  }
};
