import { motion } from "framer-motion";
import { useState } from "react";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import URLShortener from "@/components/URLShortener";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"qr" | "url">("qr");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold text-gray-900">
            QR Code & URL Shortener
          </h1>
          <p className="text-gray-600">
            Generate QR codes and shorten URLs with ease
          </p>
        </motion.div>

        <div className="flex justify-center space-x-4 mb-8">
          <Button
            variant={activeTab === "qr" ? "default" : "secondary"}
            onClick={() => setActiveTab("qr")}
            className="w-40"
          >
            QR Code
          </Button>
          <Button
            variant={activeTab === "url" ? "default" : "secondary"}
            onClick={() => setActiveTab("url")}
            className="w-40"
          >
            URL Shortener
          </Button>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "qr" ? <QRCodeGenerator /> : <URLShortener />}
        </motion.div>
      </div>
    </div>
  );
};

export default Index;