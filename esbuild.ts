import { BuildOptions } from "esbuild";

const config: BuildOptions = {
    entryPoints: ["./src/main.tsx"],
    outfile: "./dist/assets/bundle.js",
    format: "esm",
    bundle: true,
    minify: true,
    sourcemap: true,
};

export default config;
