// fake database 
const registeredHomes = [];
module.exports = class Home {
  constructor(houseName,price,location,rating,photoURl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoURl = photoURl;
  }
  save () {
  registeredHomes.push(this);
}

}


