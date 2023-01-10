exports.getAllBikejourneysMay = async (req, res, next) => {
  res.send("GET all Bikejourneys in May");
};

exports.createNewBikejourneysMay = (req, res, next) => {
  res.send("CREATE a new Bikejourney");
};

exports.updateBikejourneysMayById = (req, res, next) => {
  res.send("UPDATE a Bikejourney by id");
};

exports.DeleteBikejourneysMayById = (req, res, next) => {
  res.send("DELETE a Bikejourney");
};
