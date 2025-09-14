// rollup.config.ts
import { nodeExternals } from "rollup-plugin-node-externals";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json"; // <-- Add this line
import { fileURLToPath } from "url";
import path from "path";

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
	input: "src/server.ts",
	output: {
		dir: "dist",
		format: "cjs",
		preserveModules: true,
		exports: "named",
	},
	plugins: [
		nodeExternals(),
		// Configure the alias plugin to resolve '@' imports
		alias({
			entries: [
				{
					find: "@",
					replacement: path.resolve(__dirname, "src"),
				},
			],
		}),
		// Handle JSON imports
		json(), // <-- Add this line
		// Resolve external modules from node_modules
		resolve(),
		// Convert CommonJS modules to ES modules
		commonjs(),
		// Transpile TypeScript code
		typescript(),
	],
};
