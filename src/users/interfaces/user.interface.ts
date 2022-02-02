import { Document } from 'mongoose'
export interface User extends Document {
  chatID: number
  location: { lon: number; lat: number }
  time: string
}
