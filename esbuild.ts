import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { BuildOptions, OnLoadArgs, Plugin, PluginBuild } from "esbuild";
import { sassPlugin, postcssModules } from "esbuild-sass-plugin";

const svgPlugin = (options: { copyTo: string }): Plugin => {
    options;
    return {
        name: "svg",
        setup: async (build: PluginBuild) => {
            const outputBaseDir = path.join(
                build.initialOptions.outdir
                    ? build.initialOptions.outdir
                    : path.dirname(build.initialOptions.outfile || ""),
                options.copyTo,
            );
            await fs.mkdir(outputBaseDir, { recursive: true });
            build.onLoad({ filter: /.+\.svg$/ }, async (args: OnLoadArgs) => {
                const originalFilename =
                    path.basename(args.path).split(".")[0] || "";
                const fileContent = await fs.readFile(args.path);
                const hash = crypto
                    .createHash("sha256")
                    .update(fileContent)
                    .digest("hex");
                const distFilename = `${originalFilename}-${hash}.svg`;
                await fs.copyFile(
                    args.path,
                    path.join(outputBaseDir, distFilename),
                );
                return {
                    contents: `/${options.copyTo}/${distFilename}`,
                    loader: "text",
                };
            });
            return;
        },
    };
};

const config: BuildOptions = {
    entryPoints: ["./src/main.tsx"],
    format: "esm",
    bundle: true,
    sourcemap: true,
    loader: {
        ".svg": "text",
    },
    plugins: [
        sassPlugin({
            transform: postcssModules({}),
        }),
        svgPlugin({ copyTo: "assets" }),
        // copy({
        //     assets: {
        //         from: ["./src/public/**/*"],
        //         to: ["./public"],
        //     },
        // }),
    ],
};

export default config;
