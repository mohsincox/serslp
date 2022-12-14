const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");
const app = express();

const port = 8080;
app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/Images", express.static("./Images"));

const db = require("./models");
db.sequelize.sync({ force: false });

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/permissions", require("./routes/permissionRoutes"));
app.use("/api/roles", require("./routes/roleRoutes"));
app.use("/api/games", require("./routes/gameRoutes"));
app.use("/api/countries", require("./routes/countryRoutes"));
app.use("/api/tournaments", require("./routes/tournamentRoutes"));
app.use("/api/players", require("./routes/playerRoutes"));
app.use("/api/sliders", require("./routes/sliderRoutes"));
app.use("/api/matches", require("./routes/matchRoutes"));
app.use("/api/franchises", require("./routes/franchiseRoutes"));
app.use("/api/clubs", require("./routes/clubRoutes"));
app.use("/api/tournament-teams", require("./routes/tournamentTeamRoutes"));
app.use(
  "/api/tournament-team-players",
  require("./routes/tournamentTeamPlayerRoutes")
);
app.use("/api/point-tables", require("./routes/pointTableRoutes"));
app.use("/api/news", require("./routes/newsRoutes"));
app.use("/api/settings", require("./routes/settingsRoutes"));
app.use("/api/auth-users", require("./routes/authUserRoutes"));
app.use("/commonapi", require("./routes/commonRoutes"));
app.use("/api/ws-tournaments", require("./routes/wsTournamentRoutes"));
app.use("/api/ws-teams", require("./routes/wsTeamRoutes"));
app.use("/api/ws-my-team", require("./routes/wsMyTeamRoutes"));
app.use("/api/ws-sliders", require("./routes/wsSliderRoutes"));
app.use("/api/ws-fixtures", require("./routes/wsFixtureRoutes"));
app.use("/api/ws-news", require("./routes/wsNewsRoutes"));
app.use("/api/ws-rankings", require("./routes/wsRankingRoutes"));
app.use(
  "/api/ws-dream-team-rankings",
  require("./routes/wsDreamTeamRankingRoutes")
);

app.use("/api/widget", require("./routes/widgetRoutes"));
app.use("/api/ads", require("./routes/adsRoutes"));
app.use("/api/page", require("./routes/pageRoutes"));

app.get("/", (req, res) => {
  res.redirect("https://shoplover.com/");
});

app.listen(port, () => {
  console.log(`Khelahobe listening on port ${port}`);
});
