import React from 'react'
import HeroSection from './HeroSection'
import CategorySlider from './CategorySlider'
import connectDb from '@/app/lib/db'
import Grocery, { IGrocery } from '@/app/models/grocery.model'
import GroceryItemCard from './GroceryItemCard'

async function UserDashboard() {
  await connectDb()
  const groceries = await Grocery.find({})
  const plainGroceries: IGrocery[] = JSON.parse(JSON.stringify(groceries))

  return (
    <>
      <HeroSection />

      <div className="mt-2.5">
        <CategorySlider />
      </div>

      {/* Products grid */}
      <div className="px-4 pb-10 mt-4">
        {plainGroceries.length === 0 ? (
          <p className="text-center text-zinc-500 text-sm py-16">
            No products found.
          </p>
        ) : (
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {plainGroceries.map((item) => (
              <GroceryItemCard key={String(item._id)} item={item} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default UserDashboard