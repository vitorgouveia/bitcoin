import process from "node:process"

import { server } from "./lib/application/http/server.js"
import { callbackServer } from "./lib/application/callback/server.js"

const startup = async () => {
  server.start()
  callbackServer.start()
}
const shutdown = async () => {
  server.stop()
  await callbackServer.stop()
}

process
  .on("SIGTERM", shutdown)
  .on("SIGINT", shutdown)
  .on("SIGHUP", shutdown)
  .on("uncaughtException", (error) => {
    // throw error;
  })
  .on("unhandledRejection", (error) => {
    console.log("Something threw. Error: %s", error.message)
    // throw error;
  })
  .on("exit", () => {})
  
try {
  await startup()
} catch(error) {
}