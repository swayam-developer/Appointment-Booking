import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 mt-16 border-t">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Schedula
          </h3>
          <p className="text-sm text-white">
            A modern healthcare appointment booking platform connecting
            patients with trusted doctors seamlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3 text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white">
            <li className="hover:text-primary cursor-pointer">
              Home
            </li>
            <li className="hover:text-primary cursor-pointer">
              Doctors
            </li>
            <li className="hover:text-primary cursor-pointer">
              Appointments
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3 text-white">Contact Us</h4>
          <div className="space-y-2 text-sm text-white">
            <p className="flex items-center gap-2">
              <Mail size={16} />
              support@schedula.com
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} />
              +91 98765 43210
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} />
              Mumbai, India
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-50 text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} Schedula. All rights reserved.
      </div>
    </footer>
  );
}
