
"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Auralis from "@/components/Auralis";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col relative w-full overflow-hidden">
      <div className="absolute inset-0 z-0 h-screen">
        <Auralis speed={0.1} grain={0} />
      </div>

      <Navbar />

      <div className="flex-grow z-10 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-16">
        
        {/* Left Side */}
        <div className="md:w-1/2">
          <h1 className="text-5xl md:text-6xl font-bold text-[#1c1c1c] mb-6 tracking-tight">
            Let's Build Together.
          </h1>

          <p className="text-xl text-gray-600 font-medium leading-relaxed mb-10">
            Ready to engineer your digital infrastructure for what comes next?
            Contact our team of system integration experts.
          </p>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold text-gray-400 tracking-wider mb-2 uppercase">
                Headquarters
              </h4>
              <p className="text-[#1c1c1c] font-medium text-lg">
                Servtech Horizon Technologies
              </p>
              <p className="text-gray-600">
                Enterprise Technology Center
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-400 tracking-wider mb-2 uppercase">
                General Inquiries
              </h4>
              <p className="text-[#1c1c1c] font-medium text-lg">
                contact@servtech.example.com
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:w-1/2">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
            
            <div className="absolute top-0 left-0 w-full h-1 bg-[#f97316]"></div>

            <form
              action="https://formspree.io/f/xyezldkz"
              method="POST"
              className="space-y-6"
            >
              {/* First Name + Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    First Name
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    autoComplete="given-name"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Last Name
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    autoComplete="family-name"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent transition-all"
                  />
                </div>
              
              </div>

                              <div>
                  <label
                    htmlFor="ContactNumber"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Contact Number
                  </label>

                  <input
                    id="ContactNumber"
                    name="ContactNumber"
                    type="number"
                    required
                    autoComplete="family-name"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent transition-all"
                  />
                </div>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Work Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent transition-all"
                />
              </div>

              {/* Organization */}
              <div>
                <label
                  htmlFor="organization"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Organization
                </label>

                <input
                  id="organization"
                  name="organization"
                  type="text"
                  required
                  autoComplete="organization"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  How can we help?
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent transition-all"
                ></textarea>
              </div>

              {/* Optional subject */}
              <input
                type="hidden"
                name="_subject"
                value="New Contact Form Submission - Servtech Horizon Technologies"
              />

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#1c1c1c] text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
