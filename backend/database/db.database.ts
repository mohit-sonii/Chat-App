

import mongoose from 'mongoose'

export async function dbConnect() {
   try {
      await mongoose.connect(process.env.Database_url || '')
   } catch (error) {
      console.log(error, 'Error while connecting to Database')
      process.exit(1)
   }
}

