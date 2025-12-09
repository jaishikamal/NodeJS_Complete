const Home = require("../Models/Home");

exports.getAddHome = (req, res, next) => {
  res.render("host/addHome", {
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

  res.render("host/homeAdded", {
    pageTitle: "Home Added Successfully",
    currentPage: "homeAdded",
  });
};

exports.getHome = (req, res, next) => {
  const registeredHomes = Home.fetchAll(registeredHomes => {
    res.render("store/home", {
      pageTitle: "Home",
      currentPage: "home",
      registeredHomes: registeredHomes,
    });
  });
};
