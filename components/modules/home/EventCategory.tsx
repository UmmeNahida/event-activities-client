
const EventCategory = () => {
    return (
        <div>
            {/* Event Categories (sponsors area) */}
            <section className="mt-10 bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold">Event Categories</h2>
                <p className="mt-2 text-sm text-gray-500">Browse by popular categories or sponsors.</p>

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {['Outdoors', 'Tech', 'Food', 'Music', 'Workshops', 'Networking'].map((cat) => (
                        <div key={cat} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-50 hover:shadow-md">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-sky-600 font-bold">{cat[0]}</div>
                            <div className="text-xs font-medium">{cat}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default EventCategory