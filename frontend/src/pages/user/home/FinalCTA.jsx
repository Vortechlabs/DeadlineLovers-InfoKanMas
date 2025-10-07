// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600  to-blue-800 rounded-3xl p-1 max-w-6xl mx-auto mb-20"
        >
          <div className="bg-white rounded-3xl p-12 lg:p-16">
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-6 py-3 rounded-full mb-8 font-semibold"
              >
                🚀 Siap Memulai Transformasi Digital?
              </motion.div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Mari Wujudkan{" "}
                <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  Transparansi
                </span>{" "}
                Bersama
              </h2>

              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Jadwalkan demo gratis dan lihat bagaimana platform kami dapat 
                mengubah cara organisasi Anda mengelola anggaran dengan lebih 
                transparan dan efisien.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-7 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                  Jadwalkan Demo Gratis
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:border-blue-600 px-10 py-7 text-lg rounded-full transition-all">
                  Hubungi Sales
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact & Footer */}
        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6">Hubungi Kami</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Email</div>
                  <div className="text-gray-600">info@transparansi-ai.id</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Telepon</div>
                  <div className="text-gray-600">+62 21 1234 5678</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Alamat</div>
                  <div className="text-gray-600">Jakarta, Indonesia</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
            <div className="space-y-3">
              {["Beranda", "Fitur", "Harga", "Tentang Kami", "Blog", "Karir", "FAQ", "Dokumentasi"].map((link, i) => (
                <motion.a
                  key={i}
                  href="#"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                  className="block text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-6">Newsletter</h3>
            <p className="text-gray-600 mb-6">
              Dapatkan update terbaru tentang fitur dan tips transparansi anggaran.
            </p>
            <div className="flex gap-2 mb-6">
              <input
                type="email"
                placeholder="Email Anda"
                className="flex-grow px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              />
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 rounded-lg">
                Subscribe
              </Button>
            </div>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, color: "hover:bg-blue-600" },
                { icon: Twitter, color: "hover:bg-blue-400" },
                { icon: Facebook, color: "hover:bg-blue-700" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center ${social.color} hover:text-white transition-all duration-300`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-gray-200 mt-16 pt-8 text-center text-gray-600"
        >
          <p>© 2024 InfoKanMas. All rights reserved. | Privacy Policy | Terms of Service</p>
        </motion.div>
      </div>
    </section>
  );
}