const registeredHomes = [];

exports.getAddHome = (req, res, next) => {
  res.render("addHome", { pageTitle: "Add Home to airbnb" });
};

exports.postAddHome = (req, res, next) => {
  console.log(
    "Home Registration successful for:",
    req.body,
    req.body.houseName
  );
  registeredHomes.push({ houseName: req.body.houseName });
  res.render("homeAdded", { pageTitle: "Home Added Successfully" });
};

 exports.getHome = (req, res, next) => {
  console.log(registeredHomes);
  res.render('home', {registeredHomes: registeredHomes, pageTitle: 'airbnb Home'});
 };
 exports.get404 = (req, res, next) => {
  res.status(404).render('404', {pageTitle: 'Page Not Found'});
};