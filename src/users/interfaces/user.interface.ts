import { Document } from 'mongoose'
export interface User extends Document {
  chatID: number
  location: { longitude: number; latitude: number }
  time: string
}
