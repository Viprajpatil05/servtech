"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#010103] text-gray-400 py-16 border-t border-gray-900 mt-auto w-full z-10 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-[#f97316] rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-lg leading-none">S</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-white">SERVTECH</span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-6">
              A system integrator bringing complex technology ecosystems together. Engineering digital infrastructure for what comes next.
            </p>
            <button className="bg-[#f97316] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition-colors">
              Let's Build Together
            </button>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide text-sm">TECHNOLOGY</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/solutions" className="hover:text-white transition-colors">Cloud</Link></li>
              <li><Link href="/solutions" className="hover:text-white transition-colors">Networking</Link></li>
              <li><Link href="/solutions" className="hover:text-white transition-colors">Cybersecurity</Link></li>
              <li><Link href="/solutions" className="hover:text-white transition-colors">Artificial Intelligence</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide text-sm">COMPANY</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Servtech</Link></li>
              <li><Link href="/solutions" className="hover:text-white transition-colors">Capabilities</Link></li>
              <li><Link href="/industries" className="hover:text-white transition-colors">Industries</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide text-sm">CONNECT</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="mailto:customer.support@servtech.co.in" className="hover:text-white transition-colors">customer.support@servtech.co.in</a></li>
              <li><a href="tel:+918655866590" className="hover:text-white transition-colors">+91 86558 66590</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between text-xs">
          <p>&copy; {new Date().getFullYear()} Servtech Horizon Technologies. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
