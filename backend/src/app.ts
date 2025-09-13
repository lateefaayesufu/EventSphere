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
const PgStore = connectPgSimple(session);

app.use(morgan("tiny"));

// ✅ Single CORS config
app.use(
	cors({
		origin: ["http://localhost:5173", "https://yourfrontend.com"],
		credentials: true,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
	})
);

app.use(express.json());

// ✅ Sessions
app.use(
	session({
		store: new PgStore({
			conString: process.env.DATABASE_URL,
			createTableIfMissing: true, // better for local dev
		}),
		secret: process.env.SESSION_SECRET || "a-very-strong-secret",
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production", // only secure in prod
			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // lax in dev
			maxAge: 1000 * 60 * 60 * 24, // 1 day
		},
	})
);

// ✅ Routes
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
