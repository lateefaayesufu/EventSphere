import express from "express";
import cors from "cors";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import AuthRoutes from "@/routes/AuthRoutes";
import UserRoutes from "@/routes/UserRoutes";
import EventRoutes from "@/routes/EventRoutes";
import errorHandler from "@/middlewares/errorHandler";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const app = express();

app.use(morgan("tiny"));

const PgStore = connectPgSimple(session);

app.use(
	session({
		store: new PgStore({
			conString: process.env.DATABASE_URL,
			createTableIfMissing: false,
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
app.use("/api/v1/events", EventRoutes);
app.use("/api/v1/users", UserRoutes);

app.get("/api/test", (req, res) => {
	res.json({ message: "EventSphere Backend is running!" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
	res.status(404).json({
		message:
			"Not Found. Please read the documentation at /api-docs for available routes.",
	});
});

app.use(errorHandler);

export default app;
