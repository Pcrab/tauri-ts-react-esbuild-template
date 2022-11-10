import esbuild from "esbuild";
import config from "./esbuild.js";

esbuild
    .serve(
        {
            servedir: "dist",
            port: 1420,
        },
        {
            ...config,
        },
    )
    .catch(() => {
        process.exit(1);
    });
