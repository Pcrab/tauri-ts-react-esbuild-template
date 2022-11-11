import { BuildOptions } from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";

const config: BuildOptions = {
    entryPoints: ["./src/main.tsx"],
    outfile: "./dist/assets/bundle.js",
    format: "esm",
    bundle: true,
    minify: true,
    sourcemap: true,
    plugins: [sassPlugin()],
};

export default config;
