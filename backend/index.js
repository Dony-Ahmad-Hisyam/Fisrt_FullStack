import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import adminRoute from "./routes/adminRoute.js";
import session from "express-session";
import AuthRoute from "./routes/AuthRoute.js";
import AuthPem from "./routes/AuthPem.js";
import SequelizeStore from "connect-session-sequelize";
import db from "./config/database.js";
import Pelayanan from "./routes/pelayanan.js";
import Pemohon from "./routes/pemohon.js";
import pemohonAdmin from "./routes/pemohonAdmin.js";
import Permohonan from "./routes/permohonan.js";
import Petugas from "./routes/petugas.js";
import tindakan from "./routes/tindakan.js";
import permohonanAdmin from "./routes/permohonanAdmin.js";
import pelayananAdmin from "./routes/pelayananAdmin.js";
import petugasAdmin from "./routes/petugasAdmin.js";
import tindakanAdmin from "./routes/tindakanAdmin.js";
dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(express.json());
app.use(adminRoute);
app.use(AuthRoute);
app.use(Pelayanan);
app.use(pelayananAdmin);
app.use(Pemohon);
app.use(pemohonAdmin);
app.use(AuthPem);
app.use(Permohonan);
app.use(permohonanAdmin);
app.use(Petugas);
app.use(petugasAdmin);
app.use(tindakan);
app.use(tindakanAdmin);

// store.sync();

app.listen(process.env.APP_PORT, () => console.log("Server Running..."));
