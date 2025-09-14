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
import swaggerDocument from "@/swagger.json";

const app = express();
app.set('trust proxy', 1); // Trust the first proxy
const PgStore = connectPgSimple(session);

app.use(morgan("tiny"));

// ✅ Environment-aware CORS
app.use(
	cors({
		origin:
			process.env.NODE_ENV === "production"
				? "https://eventspheres.vercel.app" // Vercel frontend
				: "http://localhost:5173", // Dev frontend
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
			createTableIfMissing: true, // helpful in dev
		}),
		secret: process.env.SESSION_SECRET || "a-very-strong-secret",
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production", // HTTPS only in prod
			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // cross-site in prod
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

// ✅ Fallback 404
app.use((req, res) => {
	res.status(404).json({
		message:
			"Not Found. Please read the documentation at /api-docs for available routes.",
	});
});

// ✅ Global error handler
app.use(errorHandler);

export default app;
