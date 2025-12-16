import React from 'react'

const CTA = () => {
  return (
    <div>
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
  )
}

export default CTA