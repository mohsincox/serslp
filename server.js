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

app.use(express.json());
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
app.use("/api/ws-tournaments", require("./routes/wsTournamentRoutes"));
app.use("/api/ws-teams", require("./routes/wsTeamRoutes"));
app.use("/api/ws-sliders", require("./routes/wsSliderRoutes"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Khelahobe listening on port ${port}`);
});
