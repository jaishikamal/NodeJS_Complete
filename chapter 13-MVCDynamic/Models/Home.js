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
  }

  static fetchAll() {
    return registeredHomes;
  }
};
