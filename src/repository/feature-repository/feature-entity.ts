import mongoose from 'mongoose'

export class Feature {
  _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId()

  icon: string = ''

  text: string = ''
}

export const FeatureSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  icon: String,
  text: String,
})
