import React from 'react'
import { testimonials } from './Home'

const Testimonials = () => {
  return (
    <div>
         {/* Testimonials */}
                  <section className="mt-10">
                    <h2 className="text-xl font-semibold">What people say</h2>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                      {testimonials.map((t) => (
                        <blockquote key={t.id} className="bg-white p-6 rounded-xl shadow-sm">
                          <p className="text-gray-700">"{t.text}"</p>
                          <cite className="block mt-4 text-sm font-semibold">— {t.name}</cite>
                        </blockquote>
                      ))}
                    </div>
                  </section>
    </div>
  )
}

export default Testimonials