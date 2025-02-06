import { useState } from "react";
import { motion } from "framer-motion";
import copy from "copy-to-clipboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const translations = {
  pt: {
    enterUrl: "Digite a URL longa",
    shorten: "Encurtar URL",
    shortening: "Encurtando...",
    copy: "Copiar para Área de Transferência",
    success: "Sucesso",
    shortened: "URL encurtada com sucesso!",
    copied: "URL copiada para a área de transferência!",
    error: "Erro",
    failed: "Falha ao encurtar URL. Tente novamente mais tarde."
  },
  en: {
    enterUrl: "Enter long URL",
    shorten: "Shorten URL",
    shortening: "Shortening...",
    copy: "Copy to Clipboard",
    success: "Success",
    shortened: "URL shortened successfully!",
    copied: "URL copied to clipboard!",
    error: "Error",
    failed: "Failed to shorten URL. Please try again later."
  },
  es: {
    enterUrl: "Ingrese URL larga",
    shorten: "Acortar URL",
    shortening: "Acortando...",
    copy: "Copiar al Portapapeles",
    success: "Éxito",
    shortened: "¡URL acortada con éxito!",
    copied: "¡URL copiada al portapapeles!",
    error: "Error",
    failed: "Error al acortar URL. Por favor, inténtelo más tarde."
  },
  ru: {
    enterUrl: "Введите длинный URL",
    shorten: "Сократить URL",
    shortening: "Сокращение...",
    copy: "Копировать в буфер",
    success: "Успех",
    shortened: "URL успешно сокращен!",
    copied: "URL скопирован в буфер!",
    error: "Ошибка",
    failed: "Не удалось сократить URL. Попробуйте позже."
  },
  zh: {
    enterUrl: "输入长网址",
    shorten: "缩短网址",
    shortening: "缩短中...",
    copy: "复制到剪贴板",
    success: "成功",
    shortened: "网址缩短成功！",
    copied: "网址已复制到剪贴板！",
    error: "错误",
    failed: "缩短网址失败。请稍后重试。"
  },
  fr: {
    enterUrl: "Entrez l'URL longue",
    shorten: "Raccourcir l'URL",
    shortening: "Raccourcissement...",
    copy: "Copier dans le Presse-papiers",
    success: "Succès",
    shortened: "URL raccourcie avec succès !",
    copied: "URL copiée dans le presse-papiers !",
    error: "Erreur",
    failed: "Échec du raccourcissement de l'URL. Veuillez réessayer plus tard."
  }
};

const URLShortener = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const language = document.documentElement.lang || "en";
  const t = translations[language as keyof typeof translations];

  const formatUrl = (inputUrl: string) => {
    if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
      return `https://${inputUrl}`;
    }
    return inputUrl;
  };

  const shortenUrl = async () => {
    setIsLoading(true);
    try {
      const formattedUrl = formatUrl(url);
      const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(formattedUrl)}`);
      
      if (!response.ok) {
        throw new Error('URL shortening service is temporarily unavailable');
      }
      
      const shortUrl = await response.text();
      if (shortUrl) {
        setShortUrl(shortUrl);
        toast({
          title: t.success,
          description: t.shortened,
        });
      } else {
        throw new Error('Invalid response from URL shortening service');
      }
    } catch (error) {
      console.error('URL shortening error:', error);
      toast({
        title: t.error,
        description: t.failed,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const copyToClipboard = () => {
    copy(shortUrl);
    toast({
      title: t.success,
      description: t.copied,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="p-6 backdrop-blur-sm bg-white/80 shadow-lg">
        <div className="space-y-4">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={t.enterUrl}
            className="w-full"
          />
          <Button
            onClick={shortenUrl}
            className="w-full"
            disabled={!url || isLoading}
          >
            {isLoading ? t.shortening : t.shorten}
          </Button>
          {shortUrl && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-2"
            >
              <Input
                type="text"
                value={shortUrl}
                readOnly
                className="w-full bg-gray-50"
              />
              <Button
                onClick={copyToClipboard}
                variant="secondary"
                className="w-full"
              >
                {t.copy}
              </Button>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default URLShortener;