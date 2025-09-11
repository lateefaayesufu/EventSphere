import express from "express";
import cors from "cors";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import AuthRoutes from "@/routes/AuthRoutes";
import errorHandler from "@/middlewares/errorHandler";

const app = express();

const PgStore = connectPgSimple(session);

app.use(
	session({
		store: new PgStore({
			conString: process.env.POSTDATABASE,
			createTableIfMissing: true,
		}),
		secret: process.env.SESSION_SECRET || "a-very-strong-secret",
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
	})
);

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", AuthRoutes);

app.get("/api/test", (req, res) => {
	res.json({ message: "EventSphere Backend is running!" });
});

app.use((req, res) => {
	res.status(404).json({
		message: "Not Found. Please read the documentation for available routes.",
	});
});
app.use((req, res) => {
	res.status(404).json({ message: "Not Found" });
});
app.use(errorHandler);

export default app;
