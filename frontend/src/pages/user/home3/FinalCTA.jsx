// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

function FinalCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Transform Budget Transparency?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Bergabunglah dengan revolusi transparansi anggaran menggunakan kecerdasan buatan
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6">
              <Sparkles className="w-5 h-5 mr-2" />
              View Live Demo
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6">
              Download Proposal
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Contact Form */}
          <Card className="p-8 max-w-2xl mx-auto bg-white/10 backdrop-blur-lg border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Tertarik untuk kolaborasi?</h3>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  className="px-4 py-3 rounded-lg bg-white/90 border-0 focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-3 rounded-lg bg-white/90 border-0 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              <textarea
                placeholder="Pesan Anda"
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white/90 border-0 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Kirim Inquiry
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export default FinalCTA