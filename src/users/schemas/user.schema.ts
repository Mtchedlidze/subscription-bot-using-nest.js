import { Schema } from 'mongoose'

export const UserSchema = new Schema({
  location: {
    type: Object,
  },
  time: {
    type: String,
  },
  chatID: {
    type: Number,
  },
})
