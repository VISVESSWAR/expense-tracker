import esbuild from "esbuild";
import postCssPlugin from "@deanc/esbuild-plugin-postcss";

esbuild
  .build({
    entryPoints: ["src/index.js"],
    bundle: true,
    outfile: "dist/bundle.js",
    plugins: [
      postCssPlugin({
        plugins: [require("tailwindcss"), require("autoprefixer")],
      }),
    ],
    watch: true, // Optional: Watch for changes
  })
  .catch(() => process.exit(1));
