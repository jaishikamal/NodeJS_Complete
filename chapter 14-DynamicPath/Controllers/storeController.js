const Home = require("../Models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    })
  );
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/home-list", {

      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    })
  );
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

exports.getFavouriteList = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/favourite-list", {
      registeredHomes: registeredHomes,
      pageTitle: "My Favourites",
      currentPage: "favourites",
    })
  );
};
exports.postAddToFavourite = (req, res, next) => {
  console.log(req.body)
  res.redirect("/favourites");
}
exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log(homeId);
  Home.findBYId(homeId, (home) => {
    if (!home) {
      return res.redirect("/store/homes");
    } else {
      console.log(home);

      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "Home",
      });
    }
  });
};
