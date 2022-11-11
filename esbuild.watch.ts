import esbuild from "esbuild";
import config from "./esbuild.js";

esbuild
    .build({
        ...config,
        watch: true,
    })
    .catch((e) => {
        console.log(e);
        process.exit(1);
    });
