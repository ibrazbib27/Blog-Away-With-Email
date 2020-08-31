import * as path from "path";
import * as express from "express";
import * as passport from "passport";
import * as cors from "cors";

import "./middleware/localstrategy";
import "./middleware/bearerstrategy";

import routes from "./routes/index";

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(express.static("public"));
app.use(routes);
app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
