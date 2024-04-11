import express from "express"

import { config } from "../../infra/config.js"

const app = express()

app.get("/", async (request, response) => {
  new Promise((_, reject) => reject("error"))
  return response.json({
    alive: true
  })
})

let http = null

export const server = {
  start: () => {
    http = app.listen(config.get("PORT"), () => {
      console.log("[http] server started")
    })
  },
  stop: () => {
    console.log("[http] server stopping")
    http?.close()
  }
}