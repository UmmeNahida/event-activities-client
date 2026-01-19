import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="relative bg-[#0B0E24] text-white pt-20 pb-16 overflow-hidden">
      {/* Blue Glow Background */}
      <div className="absolute inset-0">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 
      w-[600px] h-[300px] 
      bg-blue-600/40 
      rounded-full 
      blur-3xl 
      opacity-60"
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6">
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-blue-500">V</span>ibent
          </h2>
          <p className="opacity-70">Social Link</p>
          <div className="flex gap-3 mt-3">
            <Link href={"https://www.facebook.com/programmerababil"}>
              <div className="p-1 bg-white/10 flx items-center justify-center rounded-full">
                <Facebook />{" "}
              </div>
            </Link>
            <Link
              href={"https://www.instagram.com/ummenahida.dev"}
              className="p-1 bg-white/10 flx items-center justify-center rounded-full"
            >
              <Instagram />
            </Link>
            <Link
              href={"https://www.linkedin.com/in/devababil"}
              className="p-1 bg-white/10 flx items-center justify-center rounded-full"
            >
              <Linkedin />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">
            Venue Address
          </h3>
          <p className="opacity-70">4517 Washington. mg</p>
          <p className="opacity-70">Manchester, Kentucky 39495</p>
          <p className="mt-3">Phone Call:</p>
          <p className="opacity-70">208-6666-0112</p>
          <p className="opacity-70">308-5555-0113</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="opacity-70">4517 Washington. mg</p>
          <p className="opacity-70">Manchester, Kentucky 39495</p>
          <p className="mt-3">Phone Call:</p>
          <p className="opacity-70">208-6666-0112</p>
          <p className="opacity-70">308-5555-0113</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
          <p className="opacity-70 mb-3">
            Sign up for weekly updates
          </p>
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-4 py-2 rounded-lg bg-white/10"
          />
          <div className="flex items-center gap-2 mt-3">
            <input type="checkbox" />
            <span>I agree to the Privacy Policy</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 mt-10 pt-6 text-center opacity-70">
        ©2025 All rights reserved. Designed by You.
      </div>
    </footer>
  );
}
