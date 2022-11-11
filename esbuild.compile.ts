import * as esbuild from "esbuild";
import config from "./esbuild.js";

esbuild
    .build({
        ...config,
    })
    .catch((e) => {
        console.log(e);
        process.exit(1);
    });
