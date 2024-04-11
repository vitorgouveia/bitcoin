import { Worker } from "node:worker_threads"
import path from "node:path"

let worker = null

export const callbackServer = {
  start() {
    console.log("[callback] server started")

    worker = new Worker("./lib/application/callback/worker.js")
    worker.on("message", (message) => {
      console.log(message)
    })
    worker.on("error", (a) => {
      console.log("error", a)
    })
    worker.on("exit", (a) => {
      console.log("exited")
    })
  },
  async stop() {
    console.log("[callback] server stopping")

    worker?.postMessage("stop")

    worker?.on("stop-success", async () => {
      await worker?.terminate()
      console.log("[callback] server stopped")
    })
  }
}