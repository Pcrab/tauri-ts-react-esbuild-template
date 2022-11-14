import esbuild from "esbuild";
import config from "./esbuild.js";

esbuild
    .build({
        ...config,
        watch: true,
        define: {
            "process.env.NODE_ENV": "'development'",
        },
    })
    .catch((e) => {
        console.log(e);
        process.exit(1);
    });
