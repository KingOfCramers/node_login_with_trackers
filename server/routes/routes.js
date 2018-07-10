// Middlewares
const { authenticate } = require("../middleware/authenticate");
const { tweetValidator, legislationValidator, caseValidator } = require("../middleware/trackerValidators");

// Logic (Drivers)
const DriversController = require("../controllers/driversController");

// Routes (exported to server)
module.exports = (app) => {
  app.get("/", authenticate, DriversController.home);
  app.post("/users", DriversController.users);
  app.post("/users/login", DriversController.login);
  app.get("/users/me/", authenticate, DriversController.showme);
  app.delete("/users/me", authenticate, DriversController.logout);
  app.get("/users/me/trackers", authenticate, DriversController.trackers);
  app.post("/users/me/trackers/court_cases", authenticate, caseValidator, DriversController.court_cases);
  app.delete("/users/me/trackers/court_cases/:case_id", authenticate, DriversController.delete_case);
  app.post("/users/me/trackers/tweets", authenticate, tweetValidator, DriversController.tweets);
  app.delete("/users/me/trackers/tweets/:tweet_id", authenticate, DriversController.delete_tweet);
  app.post("/users/me/trackers/legislation", authenticate, legislationValidator, DriversController.legislation);
  app.delete("/users/me/trackers/legislation/:legislation_id", authenticate, DriversController.delete_legislation);
  app.delete("/users/me/trackers", authenticate, DriversController.delete_trackers);
}