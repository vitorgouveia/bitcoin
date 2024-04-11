import "dotenv/config"

export const config = {
  get: (key) => process.env?.[key] || null
}