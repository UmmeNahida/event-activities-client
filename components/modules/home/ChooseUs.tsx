import React from 'react'

const ChooseUs = () => {
  return (
    <div>
          {/* Why Choose Us (About section style) */}
          <section className="mt-10 bg-white rounded-2xl p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h2 className="text-2xl font-bold">Why choose us</h2>
                <p className="mt-3 text-gray-600">We focus on real experiences, trusted hosts, and seamless booking. Our community-first platform
                  makes it easy to find meaningful events and meet new people.</p>

                <ul className="mt-6 space-y-3 text-sm text-gray-600">
                  <li>• Verified hosts and secure payments</li>
                  <li>• Easy creation tools with promotion features</li>
                  <li>• Live support and cancellation protection</li>
                </ul>

                <a href="/about" className="mt-6 inline-block text-sky-600 hover:underline">Learn more</a>
              </div>

              <div className="rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e&w=1200&q=80" alt="Why choose us" className="w-full h-64 object-cover" />
              </div>
            </div>
          </section>
    </div>
  )
}

export default ChooseUs