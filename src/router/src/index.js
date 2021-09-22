import { requireContentArray } from "@/utils/index"

export default requireContentArray(require.context("./", true, /^\.\/[\s\S]+\/*\.js$/), ["./index.js"])
