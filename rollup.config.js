import { createPlugins } from "rollup-plugin-atomic"

const plugins = createPlugins(["ts", "js"])

export default [
  {
    input: "src/index.ts",
    output: [
      {
        dir: "dist",
        format: "cjs",
        sourcemap: true,
      },
    ],
    // loaded externally
    external: [],
    plugins: plugins,
  },
]
