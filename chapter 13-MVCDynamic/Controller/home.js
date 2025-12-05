const Home = require("../Models/Home");

exports.getAddHome = (req, res, next) => {
  res.render("addHome", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
  });
};

exports.postAddHome = (req, res, next) => {
  console.log("Home Registration successful for:", req.body);
  const {homeName, price, location, rating, photoURL} = req.body;
  
  const home = new Home(
    homeName,
    price,
    location,
    rating,
    photoURL
  );

  home.save();

  res.render("homeAdded", {
    pageTitle: "Home Added Successfully",
    currentPage: "homeAdded",
  });
};

exports.getHome = (req, res, next) => {
  const registeredHomes = Home.fetchAll();
  console.log(registeredHomes);

  res.render("home", {
    registeredHomes: registeredHomes,
    pageTitle: "airbnb Home",
    currentPage: "Home",
  });
};
