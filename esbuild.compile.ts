import * as esbuild from "esbuild";
import config from "./esbuild.js";

esbuild
    .build({
        ...config,
        outfile: "./dist/production/bundle.js",
        minify: true,
    })
    .catch((e) => {
        console.log(e);
        process.exit(1);
    });
