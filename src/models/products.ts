import mongoose, { Document, Schema } from 'mongoose'

export interface IProduct extends Document {
 website: string
 title: string
 original_price: number
 discount_price: number
 offer_url: string
 is_offer_day: boolean
 is_available: boolean
 delivery_is_free: string
 category: {
  Id: string
  Name: string
 }
 discount_percentage: string
 image: string
 rating: {
  rating: number
  amount: string
 }
 sales: {
  days: string
  amount: string
 }
}

const ProductSchema = new Schema<IProduct>({
 website: String,
 title: String,
 original_price: Number,
 discount_price: Number,
 offer_url: String,
 is_offer_day: Boolean,
 is_available: Boolean,
 delivery_is_free: String,
 category: {
  Id: String,
  Name: String
 },
 discount_percentage: String,
 image: String,
 rating: {
  rating: Number,
  amount: String
 },
 sales: {
  days: String,
  amount: String
 }
})

const Product = mongoose.model<IProduct>('Product', ProductSchema)

export default Product
