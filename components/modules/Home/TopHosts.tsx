import Image from "next/image";

export default function TopHosts() {
  const speakers = [
    {
      name: "Darrell Steward",
      role: "Founder & CEO, GTGO",
      desc: "Solving real problems through innovation & creative thinking.",
      img: "https://i.ibb.co.com/ccGwqhv0/host04.avif",
    },
    {
      name: "Darlene Robertson",
      role: "Co–Founder, MPLM",
      desc: "Building impactful solutions and driving innovation forward.",
      img: "https://i.ibb.co.com/jZMhKqgd/host03.jpg",
    },
    {
      name: "Brooklyn Simmons",
      role: "Director Leader, UTLC",
      desc: "Guiding teams and driving impactful innovation forward.",
      img: "https://i.ibb.co.com/811jn2P/user02.avif",
    },
    {
      name: "Cameron Ondaiya",
      role: "Business Advisor, BDS",
      desc: "Empowering growth and delivering strategic business solutions.",
      img: "https://i.ibb.co.com/B2vfK9Sd/man01.avif",
    },
  ];

  return (
    <section className="w-full bg-[#030b3a] bg-gradient-to-b from-[#030b3a] via-[#0b0f4b] to-[#030b3a] py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-blue-400 tracking-widest uppercase text-sm mb-2">Our Toprated Hosts</p>
        <h2 className="text-4xl font-bold text-white mb-12">Say Hello to Our Hosts</h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {speakers.map((spk, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl flex items-center gap-6 hover:bg-white/10 transition duration-300"
            >
              {/* Image */}
              <div className="min-w-[180px] h-[180px] relative rounded-xl overflow-hidden">
                <Image src={spk.img} alt={spk.name} fill className="object-cover" />
              </div>

              {/* Text */}
              <div className="text-left text-white">
                <h3 className="text-xl font-semibold">{spk.name}</h3>
                <p className="text-blue-300 text-sm mb-3">{spk.role}</p>
                <p className="text-sm text-gray-300 leading-relaxed">{spk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
