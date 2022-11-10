import * as esbuild from "esbuild";
import config from "./esbuild.js";

esbuild
    .build({
        ...config,
    })
    .catch(() => {
        process.exit(1);
    });
