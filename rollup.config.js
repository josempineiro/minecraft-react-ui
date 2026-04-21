import path from "path";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import postcssImport from "postcss-import";
import postcssMixins from "postcss-mixins";
import autoprefixer from "autoprefixer";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: {
      dir: "build",
      format: "cjs",
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: "src",
      exports: "named",
    },
    plugins: [
      peerDepsExternal(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json", declaration: true, declarationDir: "build" }),
      postcss({
        extract: "minecraft-react-ui.css",
        plugins: [
          postcssImport({
            path: [path.resolve(__dirname, "src/styles")],
          }),
          postcssMixins({
            mixinsDir: ["src/styles/mixins"],
          }),
          autoprefixer(),
        ],
      }),
    ],
  },
];
