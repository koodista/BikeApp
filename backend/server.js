require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorhandler");

connectDB();

const app = express();

//middleware
app.use(express.json());

app.use(cors());
// Routes
app.use("/api/bikejourneysmay", require("./routes/bikejourneysMayRoutes"));
app.use("/api/bikejourneysjune", require("./routes/bikejourneysJuneRoutes"));
app.use("/api/bikejourneysjuly", require("./routes/bikejourneysJulyRoutes"));
app.use("/api/bikestations", require("./routes/bikeStationsRoutes"));
// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
