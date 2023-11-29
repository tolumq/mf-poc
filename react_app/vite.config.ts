import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import federation from "@originjs/vite-plugin-federation";
// import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        reactRefresh(),
        federation({
            name: "home",
            filename: "remoteEntry.js",
            exposes: {
                "./Button": "./src/main/Button.tsx",
            },
            // shared: ["react", "react-dom"],
        }),
    ],
    build: {
        target: "esnext",
        minify: false,
        cssCodeSplit: false,
    },
});
