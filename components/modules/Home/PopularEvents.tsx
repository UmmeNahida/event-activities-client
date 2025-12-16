import React from 'react'
import { sampleEvents } from './Home'

const PopularEvents = () => {
  return (
    <div>
        {/* Popular Events (Conference Schedules style) */}
          <section className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Popular Events</h2>
              <a href="/popular" className="text-sm text-sky-600 hover:underline">Explore</a>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleEvents.slice(0,2).map((e) => (
                <article key={e.id} className="flex gap-4 items-center bg-white rounded-xl p-4 shadow-sm">
                  <img src={e.img} alt={e.title} className="w-28 h-20 object-cover rounded-md" />
                  <div>
                    <h3 className="font-semibold">{e.title}</h3>
                    <div className="text-sm text-gray-500">{e.date} • {e.location}</div>
                    <div className="mt-2 text-sm font-medium">{e.price}</div>
                  </div>
                </article>
              ))}
            </div>
          </section>

    </div>
  )
}

export default PopularEvents