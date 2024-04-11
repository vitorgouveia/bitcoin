import { parentPort } from "worker_threads"
import express from "express"

import { config } from "../../infra/config.js"

const app = express()

app.get("/callback", async (request, response) => {
  parentPort?.postMessage("Hello world")
  return response.json({
    alive: true
  })
})

const http = app.listen(config.get("CALLBACK_PORT"), () => {
  parentPort?.postMessage("[worker] starting server")
})

parentPort.on("stop", () => {
  console.log("[worker] stopping")
  http.close()

  parentPort.emit("stop-success")
})