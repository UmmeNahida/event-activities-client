/**
 * Event-Homepage.jsx
 * A single-file React component (default export) implementing a fully responsive
 * home page for an Events & Activities project. Built with Tailwind CSS.
 *
 * How to use:
 * - Drop this file into a Next.js or Create React App project.
 * - Ensure Tailwind CSS is configured and imported in your app.
 * - This component uses only Tailwind classes and plain React (no external UI lib required),
 *   but you can swap in shadcn/ui components where desired.
 *
 * Sections included (minimum 6 + extras):
 * 1. Hero (Find Activities / Create Event CTAs)
 * 2. Featured / Upcoming Events (near user)
 * 3. How It Works
 * 4. Event Categories (sponsors area replacement)
 * 5. Popular Events (Conference Schedules style)
 * 6. Top-Rated Hosts (Our Speakers style)
 * 7. Testimonials / Reviews
 * 8. Why Choose Us (About section style)
 * 9. Footer
 *
 * Notes:
 * - Replace placeholder images and data with dynamic data from your backend.
 * - The component is accessibility-minded (semantic tags, alt text, focus states).
 */

import React from "react";

export const sampleEvents = [
  {
    id: 1,
    title: "Sunset Kayak Trip",
    date: "Dec 20, 2025",
    location: "Lakeshore Park",
    price: "Free",
    img: "https://i.ibb.co.com/TxBjRR0Q/hotel-home.jpg",
  },
  {
    id: 2,
    title: "Weekend Coding Workshop",
    date: "Jan 10, 2026",
    location: "Downtown Hub",
    price: "$20",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c&w=1200&q=80",
  },
  {
    id: 3,
    title: "City Food Crawl",
    date: "Dec 28, 2025",
    location: "Old Town",
    price: "$15",
    img: "https://images.unsplash.com/photo-1541542684-3d5a19f1b1d4&w=1200&q=80",
  },
  {
    id: 4,
    title: "Photography Walk",
    date: "Jan 05, 2026",
    location: "Riverside",
    price: "Free",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee&w=1200&q=80",
  },
];

export const hosts = [
  { id: 1, name: "A. Rahman", rating: 4.9, events: 38, avatar: "https://i.pravatar.cc/150?img=32" },
  { id: 2, name: "N. Jahan", rating: 4.8, events: 22, avatar: "https://i.pravatar.cc/150?img=12" },
  { id: 3, name: "S. Hossain", rating: 4.7, events: 17, avatar: "https://i.pravatar.cc/150?img=46" },
];

export const testimonials = [
  { id: 1, name: "Maria K.", text: "Found the perfect weekend meetup — well organized and fun!" },
  { id: 2, name: "John P.", text: "Hosts are friendly and dependable. Highly recommended." },
  { id: 3, name: "Lina R.", text: "I created my first event and filled tickets in days." },
];

export default function EventHomepage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* HERO / BANNER */}
      <header className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">Find activities near you or create your own</h1>
              <p className="mt-4 text-lg sm:text-xl text-indigo-100 max-w-xl">
                Discover local events, meet people who share your passions, and host experiences that bring communities
                together. Search by category, date, or proximity.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/search"
                  className="inline-flex items-center justify-center rounded-md bg-white text-sky-700 px-5 py-3 text-sm font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                  Find Activities
                </a>

                <a
                  href="/create-event"
                  className="inline-flex items-center justify-center rounded-md border border-white/40 text-white px-5 py-3 text-sm font-semibold hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                  Create Event
                </a>
              </div>

              <div className="mt-6 text-sm text-indigo-100">
                <span className="font-medium">Popular:</span> Hiking · Workshops · Food · Live Music · Networking
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10">
                <img src="https://i.ibb.co.com/TxBjRR0Q/hotel-home.jpg" alt="Hero event" className="w-full h-64 object-cover sm:h-80 lg:h-96" />
              </div>

              <div className="absolute -bottom-6 left-6 bg-white rounded-xl shadow-xl p-4 w-64 sm:w-80">
                <div className="flex items-start gap-3">
                  <img src={sampleEvents[1].img} alt="thumb" className="w-16 h-12 rounded-md object-cover" />
                  <div>
                    <div className="text-sm font-semibold">{sampleEvents[1].title}</div>
                    <div className="text-xs text-gray-500 mt-1">{sampleEvents[1].date} • {sampleEvents[1].location}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="-mt-6">
        <div className="max-w-7xl mx-auto px-6">
          {/* Featured / Upcoming Events (near user) */}
          <section className="bg-white rounded-2xl -mt-6 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Featured & Upcoming Near You</h2>
              <a href="/events" className="text-sm text-sky-600 hover:underline">See all events</a>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sampleEvents.map((e) => (
                <article key={e.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                  <img src={e.img} alt={e.title} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="font-medium text-sm">{e.title}</h3>
                    <div className="mt-2 text-xs text-gray-500">{e.date} • {e.location}</div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-sm font-semibold">{e.price}</div>
                      <a href={`/events/${e.id}`} className="text-xs text-sky-600 hover:underline">View</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* How It Works */}
          <section className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold">How it works</h2>
                <p className="mt-3 text-gray-600">Quickly join or create events in three easy steps.</p>

                <ol className="mt-6 space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-sky-100 flex items-center justify-center font-semibold text-sky-700">1</div>
                    <div>
                      <div className="font-semibold">Find an activity</div>
                      <div className="text-sm text-gray-500">Search by category, date or nearby locations.</div>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-sky-100 flex items-center justify-center font-semibold text-sky-700">2</div>
                    <div>
                      <div className="font-semibold">Join or book</div>
                      <div className="text-sm text-gray-500">Reserve your spot and get event details instantly.</div>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-sky-100 flex items-center justify-center font-semibold text-sky-700">3</div>
                    <div>
                      <div className="font-semibold">Enjoy & review</div>
                      <div className="text-sm text-gray-500">Attend the event and leave feedback to help hosts improve.</div>
                    </div>
                  </li>
                </ol>

              </div>

              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1515165562835-cf3a1f2bc6d2&w=1200&q=80" alt="How it works" className="w-full h-80 object-cover" />
              </div>
            </div>
          </section>

          {/* Event Categories (sponsors area) */}
          <section className="mt-10 bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Event Categories</h2>
            <p className="mt-2 text-sm text-gray-500">Browse by popular categories or sponsors.</p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {['Outdoors','Tech','Food','Music','Workshops','Networking'].map((cat) => (
                <div key={cat} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-50 hover:shadow-md">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-sky-600 font-bold">{cat[0]}</div>
                  <div className="text-xs font-medium">{cat}</div>
                </div>
              ))}
            </div>
          </section>

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

          {/* Top-Rated Hosts (Our Speakers style) */}
          <section className="mt-10 bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Top-Rated Hosts</h2>
              <a href="/hosts" className="text-sm text-sky-600 hover:underline">See all hosts</a>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {hosts.map((h) => (
                <div key={h.id} className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-50">
                  <img src={h.avatar} alt={h.name} className="w-20 h-20 rounded-full object-cover" />
                  <div className="mt-3 font-semibold">{h.name}</div>
                  <div className="text-sm text-gray-500">{h.events} events • {h.rating}★</div>
                  <a href={`/hosts/${h.id}`} className="mt-3 inline-block text-sm text-sky-600 hover:underline">View profile</a>
                </div>
              ))}
            </div>
          </section>

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

          {/* CTA Banner before footer */}
          <section className="mt-12 rounded-2xl p-8 bg-gradient-to-r from-indigo-600 to-sky-600 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-semibold">Ready to host an event?</h3>
              <p className="mt-2 text-sm">Create your event, set seats, and start promoting to your local community.</p>
              <div className="mt-6 flex items-center justify-center gap-4">
                <a href="/create-event" className="inline-block bg-white text-indigo-700 px-6 py-3 rounded-md font-semibold">Create Event</a>
                <a href="/host-guide" className="inline-block border border-white/60 px-6 py-3 rounded-md">Host Guide</a>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-12 bg-white border-t">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-bold">Eventify</h4>
            <p className="mt-3 text-sm text-gray-600">Discover and host local events. Built for communities.</p>
          </div>

          <div className="text-sm text-gray-600">
            <h5 className="font-semibold">Explore</h5>
            <ul className="mt-3 space-y-2">
              <li><a href="/events" className="hover:underline">Events</a></li>
              <li><a href="/categories" className="hover:underline">Categories</a></li>
              <li><a href="/hosts" className="hover:underline">Hosts</a></li>
            </ul>
          </div>

          <div className="text-sm text-gray-600">
            <h5 className="font-semibold">Company</h5>
            <ul className="mt-3 space-y-2">
              <li><a href="/about" className="hover:underline">About</a></li>
              <li><a href="/careers" className="hover:underline">Careers</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t py-4">
          <div className="max-w-7xl mx-auto px-6 text-sm text-gray-500">© {new Date().getFullYear()} Eventify. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
