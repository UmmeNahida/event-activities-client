"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getIconComponent } from "@/lib/icon-mapper";

const testimonials = [
  {
    name: "Marry Jaen",
    role: "Web Designer",
    rating: 4.5,
    img: "https://i.ibb.co.com/My9QBRrD/review02.avif",
    text: "Using Advanced Technological Infrastructure And Expert Staff, We Deliver Comprehensive Transportation Services Efficiently Services Broad With Innovation.",
  },
  {
    name: "Alen Walker",
    role: "Manager",
    rating: 4.5,
    img: "https://i.ibb.co.com/sJHByF59/review03.avif",
    text: "Thanks To Our Advanced Technological Infrastructure And Expert Staff, We Offer Extensive Transportation Services Seamlessly.",
  },
  {
    name: "Abdur Rashid",
    role: "Founder & CEO",
    rating: 4.5,
    img: "https://i.ibb.co.com/x9xKLGG/review04.avif",
    text: "With Our Advanced Technological Infrastructure And Expert Staff, We Offer Wide–Ranging Transportation Services Through Innovative Systems.",
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // const rightArrow = getIconComponent("corner-down-right")
  // const leftArrow = getIconComponent("corner-down-left")

  return (
    <div className="w-full py-20 bg-muted/20">
      <div className="text-center mb-10">
        <h2 className="text-sm font-semibold text-primary tracking-wide">
          TESTIMONIALS
        </h2>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-primary/50 mt-1">
          What Our Clients Says
        </h1>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((item, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl shadow-sm border transition 
            ${i === index ? "bg-chart-1" : "bg-chart-2"}`}
          >
            <div className="flex items-center mb-3">
              <img
                src={item.img}
                alt=""
                className="w-14 h-14 rounded-full object-cover mr-3"
              />
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">{item.text}</p>

            <h3 className="font-bold text-muted text-lg">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.role}</p>
          </div>
        ))}
      </div>

      {/* Pagination Bar */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={prev}
          className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition"
        >
          <ArrowLeft className="text-blue-600" size={20} />
        </button>

        <div className="w-80 h-[2px] bg-gray-300 relative">
          <div
            className="absolute top-0 h-full bg-blue-600"
            style={{ width: `${((index + 1) / testimonials.length) * 100}%` }}
          />
        </div>

        <button
          onClick={next}
          className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition"
        >
          <ArrowRight className="text-blue-600" size={20} />
           
        </button>
      </div>
    </div>
  );
}
