const product = require("../Model/Datastorage");
const favourite = require("../Model/FavouriteHomeStorage");
const favouriteIds = [];

// User's main home page

const userControl = (req, res, next) => {
  product.fetchAll((err, items) => {
    if (err) {
      return next(err);
    }
    res.render("user/userPage", {
      items: items,
      title: "User home page",
      UserHomeLink: req.url,
    });
  });
};

// User's booking page

const userBookings = (req, res) => {
  res.render("store/Bookings", {
    title: "User Bookings",
    userBookingLink: req.url,
  });
};

// User's favourite homes get request page

const userFavouriteget = (req, res, next) => {
  favourite.fetchAll((err, items) => {
    if (err) {
      return next(err);
    }
    product.fetchAll((err, Productitems) => {
      if (err) {
        return next(err);
      }

      let filteredHomes = Productitems.filter((element) =>
        items.includes(element.id),
      );
      // console.log(filteredHomes);
      res.render("store/favourite-list", {
        title: "User favourite",
        userFavouriteLink: req.url,
        favouriteHomes: filteredHomes,
      });
    });
  });
};

// User's favourite homes post request page

const userFavouritepost = (req, res) => {
  // console.log("Favourite clicked:", req.params.homeId);
  // console.log("Favourite POST controller reached")
  const myRequest = req.params.homeId;
  favouriteIds.push(myRequest);
  // console.log(favouriteIds);
  const favouriteHomeId = new favourite(req.params.homeId);
  favouriteHomeId.save();
  res.redirect("/User-favourite");
};

// Home details page

const userHomes = (req, res, next) => {
  // console.log(req.params.homeId);
  product.fetchAll((err, items) => {
    if (err) {
      return next(err);
    }
    const homeId = req.params.homeId;
    const selectedHome = items.find((home) => home.id === homeId);
    res.render("store/home-detail", {
      items: selectedHome,
      title: "Home details",
      userHomeDetails: req.url,
      homeId: req.params.homeId,
    });
  });
};

// Home list page

const userHomeList = (req, res) => {
  res.render("store/home-list", { title: "Home list", userHomeList: req.url });
};

// Reserved home page

const userHomeReserve = (req, res) => {
  res.render("store/reserve", {
    title: "Reserve homes",
    reserveHomesLink: req.url,
  });
};

// User favourite homes delete controller

const userFavouriteDelete = (req, res,next) => {
  // console.log("Request is receiving....");
  // console.log(req.params.homeId);
  favourite.removeFav(req.params.homeId,(err,deletedFavs) =>{
    if(err) return next(err);

    if(!deletedFavs){
      return res.status(404).json({message :"Fav home not found"})
    }
    res.json({message : "fav Home deleted"})
  });
};

exports.userFavouriteDelete = userFavouriteDelete;
exports.userHomeReserve = userHomeReserve;
exports.userHomeList = userHomeList;
exports.userHomes = userHomes;
exports.userFavouriteget = userFavouriteget;
exports.userFavouritepost = userFavouritepost;
exports.userBookings = userBookings;
exports.userControl = userControl;
