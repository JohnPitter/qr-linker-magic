import { motion } from "framer-motion";
import { useState } from "react";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import URLShortener from "@/components/URLShortener";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Flag } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"qr" | "url">("qr");
  const [language, setLanguage] = useState("en");

  const languages = {
    pt: "Português",
    en: "English",
    es: "Español",
    ru: "Русский",
    zh: "中文",
    fr: "Français"
  };

  const translations = {
    pt: {
      title: "Gerador de QR Code & Encurtador de URL",
      subtitle: "Gere códigos QR e encurte URLs facilmente",
      qrTab: "Código QR",
      urlTab: "Encurtador de URL"
    },
    en: {
      title: "QR Code & URL Shortener",
      subtitle: "Generate QR codes and shorten URLs with ease",
      qrTab: "QR Code",
      urlTab: "URL Shortener"
    },
    es: {
      title: "Generador de QR & Acortador de URL",
      subtitle: "Genera códigos QR y acorta URLs fácilmente",
      qrTab: "Código QR",
      urlTab: "Acortador de URL"
    },
    ru: {
      title: "QR-код и сокращение URL",
      subtitle: "Создавайте QR-коды и сокращайте URL легко",
      qrTab: "QR-код",
      urlTab: "Сокращение URL"
    },
    zh: {
      title: "二维码生成器和网址缩短器",
      subtitle: "轻松生成二维码和缩短网址",
      qrTab: "二维码",
      urlTab: "网址缩短"
    },
    fr: {
      title: "Générateur de QR Code & Raccourcisseur d'URL",
      subtitle: "Générez des QR codes et raccourcissez des URLs facilement",
      qrTab: "Code QR",
      urlTab: "Raccourcisseur d'URL"
    }
  };

  const getFlagEmoji = (lang: string) => {
    const flags = {
      pt: "🇧🇷",
      en: "🇺🇸",
      es: "🇪🇸",
      ru: "🇷🇺",
      zh: "🇨🇳",
      fr: "🇫🇷"
    };
    return flags[lang as keyof typeof flags];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 relative">
      <div className="absolute top-4 right-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="w-auto px-3 flex gap-2">
              <Flag className="h-4 w-4" />
              <span className="mr-1">{getFlagEmoji(language)}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            {Object.entries(languages).map(([code, name]) => (
              <DropdownMenuItem
                key={code}
                onClick={() => setLanguage(code)}
                className="flex gap-2"
              >
                <span>{getFlagEmoji(code)}</span>
                {name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold text-gray-900">
            {translations[language as keyof typeof translations].title}
          </h1>
          <p className="text-gray-600">
            {translations[language as keyof typeof translations].subtitle}
          </p>
        </motion.div>

        <div className="flex justify-center space-x-4 mb-8">
          <Button
            variant={activeTab === "qr" ? "default" : "secondary"}
            onClick={() => setActiveTab("qr")}
            className="w-40"
          >
            {translations[language as keyof typeof translations].qrTab}
          </Button>
          <Button
            variant={activeTab === "url" ? "default" : "secondary"}
            onClick={() => setActiveTab("url")}
            className="w-40"
          >
            {translations[language as keyof typeof translations].urlTab}
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