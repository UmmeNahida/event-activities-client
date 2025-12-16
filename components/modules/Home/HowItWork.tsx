import React from 'react'
import ContainerDiv from '../../shared/ContainerDiv'
import Image from 'next/image'

const HowItWork = () => {
    return (
        <div className="">
           

                <section className="relative w-full py-28 overflow-hidden bg-gradient-to-br from-[#03045E] via-[#030672] to-[#001233] flex items-center justify-center">


                    {/* CONTENT AREA */}
                    <ContainerDiv>
                        <div className="relative z-10  h-full flex items-center justify-between gap-12 lg:gap-36">
                            <div className="text-white">
                                <p className="text-sm font-medium tracking-wider text-blue-300 mb-3">
                                    How it works
                                </p>
                                <h2 className="text-3xl lg:text-5xl font-bold leading-tight">
                                   Fast & Easy Event Participation
                                </h2>
                                <p className="mt-6 text-blue-200 leading-relaxed">
                                    Quickly join or create events in three easy steps.
                                </p>

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

                            {/* RIGHT SIDE IMAGE */}
                            <div className="hidden lg:block ml-auto">
                                <div className="rounded-2xl overflow-hidden shadow-lg">
                                    <Image src="https://i.ibb.co.com/tpbsQHFB/about-image-1.jpg" width="300" height="200" alt="How it works" className="w-full h-96 object-cover" />
                                </div>
                            </div>
                        </div>
                    </ContainerDiv>
                </section>



            
        </div>
    )
}

export default HowItWork