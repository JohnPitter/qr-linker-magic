import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const translations = {
  pt: {
    qrType: "Tipo de QR Code",
    textUrl: "Texto/URL",
    wifi: "Rede WiFi",
    textOrUrl: "Texto ou URL",
    enterTextUrl: "Digite texto ou URL",
    networkName: "Nome da Rede (SSID)",
    enterWifiName: "Digite o nome da rede WiFi",
    password: "Senha",
    enterPassword: "Digite a senha do WiFi",
    securityType: "Tipo de Segurança",
    qrColor: "Cor do QR Code",
    download: "Baixar QR Code",
    success: "Sucesso",
    downloaded: "QR code baixado com sucesso!",
    noSecurity: "Sem Segurança"
  },
  en: {
    qrType: "QR Code Type",
    textUrl: "Text/URL",
    wifi: "WiFi Network",
    textOrUrl: "Text or URL",
    enterTextUrl: "Enter text or URL",
    networkName: "Network Name (SSID)",
    enterWifiName: "Enter WiFi network name",
    password: "Password",
    enterPassword: "Enter WiFi password",
    securityType: "Security Type",
    qrColor: "QR Code Color",
    download: "Download QR Code",
    success: "Success",
    downloaded: "QR code downloaded successfully!",
    noSecurity: "No Security"
  },
  es: {
    qrType: "Tipo de Código QR",
    textUrl: "Texto/URL",
    wifi: "Red WiFi",
    textOrUrl: "Texto o URL",
    enterTextUrl: "Ingrese texto o URL",
    networkName: "Nombre de Red (SSID)",
    enterWifiName: "Ingrese nombre de red WiFi",
    password: "Contraseña",
    enterPassword: "Ingrese contraseña WiFi",
    securityType: "Tipo de Seguridad",
    qrColor: "Color del Código QR",
    download: "Descargar Código QR",
    success: "Éxito",
    downloaded: "¡Código QR descargado con éxito!",
    noSecurity: "Sin Seguridad"
  },
  ru: {
    qrType: "Тип QR-кода",
    textUrl: "Текст/URL",
    wifi: "Сеть WiFi",
    textOrUrl: "Текст или URL",
    enterTextUrl: "Введите текст или URL",
    networkName: "Имя сети (SSID)",
    enterWifiName: "Введите имя сети WiFi",
    password: "Пароль",
    enterPassword: "Введите пароль WiFi",
    securityType: "Тип безопасности",
    qrColor: "Цвет QR-кода",
    download: "Скачать QR-код",
    success: "Успех",
    downloaded: "QR-код успешно скачан!",
    noSecurity: "Без защиты"
  },
  zh: {
    qrType: "二维码类型",
    textUrl: "文本/网址",
    wifi: "WiFi网络",
    textOrUrl: "文本或网址",
    enterTextUrl: "输入文本或网址",
    networkName: "网络名称 (SSID)",
    enterWifiName: "输入WiFi网络名称",
    password: "密码",
    enterPassword: "输入WiFi密码",
    securityType: "安全类型",
    qrColor: "二维码颜色",
    download: "下载二维码",
    success: "成功",
    downloaded: "二维码下载成功！",
    noSecurity: "无安全性"
  },
  fr: {
    qrType: "Type de Code QR",
    textUrl: "Texte/URL",
    wifi: "Réseau WiFi",
    textOrUrl: "Texte ou URL",
    enterTextUrl: "Entrez le texte ou l'URL",
    networkName: "Nom du Réseau (SSID)",
    enterWifiName: "Entrez le nom du réseau WiFi",
    password: "Mot de passe",
    enterPassword: "Entrez le mot de passe WiFi",
    securityType: "Type de Sécurité",
    qrColor: "Couleur du Code QR",
    download: "Télécharger le Code QR",
    success: "Succès",
    downloaded: "Code QR téléchargé avec succès !",
    noSecurity: "Sans Sécurité"
  }
};

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [qrColor, setQrColor] = useState("#000000");
  const [qrType, setQrType] = useState<"text" | "wifi">("text");
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("WPA");
  const qrRef = useRef<SVGSVGElement>(null);
  const { toast } = useToast();
  const language = document.documentElement.lang || "en";
  const t = translations[language as keyof typeof translations];

  const generateWifiQRCode = () => {
    const wifiString = `WIFI:T:${encryption};S:${ssid};P:${password};;`;
    return wifiString;
  };

  const getQRValue = () => {
    if (qrType === "wifi") {
      return generateWifiQRCode();
    }
    return text || "https://example.com";
  };

  const downloadQRCode = () => {
    if (!qrRef.current) return;

    const svg = qrRef.current;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      
      const downloadLink = document.createElement("a");
      downloadLink.download = "qrcode.png";
      downloadLink.href = pngFile;
      downloadLink.click();

      toast({
        title: t.success,
        description: t.downloaded,
      });
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
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
          <div className="space-y-2">
            <Label>{t.qrType}</Label>
            <Select
              value={qrType}
              onValueChange={(value: "text" | "wifi") => setQrType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t.qrType} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">{t.textUrl}</SelectItem>
                <SelectItem value="wifi">{t.wifi}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {qrType === "text" ? (
            <div className="space-y-2">
              <Label>{t.textOrUrl}</Label>
              <Input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t.enterTextUrl}
                className="w-full"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{t.networkName}</Label>
                <Input
                  type="text"
                  value={ssid}
                  onChange={(e) => setSsid(e.target.value)}
                  placeholder={t.enterWifiName}
                />
              </div>
              <div className="space-y-2">
                <Label>{t.password}</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.enterPassword}
                />
              </div>
              <div className="space-y-2">
                <Label>{t.securityType}</Label>
                <Select value={encryption} onValueChange={setEncryption}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.securityType} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WPA">WPA/WPA2</SelectItem>
                    <SelectItem value="WEP">WEP</SelectItem>
                    <SelectItem value="nopass">{t.noSecurity}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>{t.qrColor}</Label>
            <Input
              type="color"
              value={qrColor}
              onChange={(e) => setQrColor(e.target.value)}
              className="w-full h-10"
            />
          </div>

          <div className="flex justify-center p-4 bg-white rounded-lg">
            <QRCodeSVG
              value={getQRValue()}
              size={200}
              fgColor={qrColor}
              level="H"
              includeMargin
              ref={qrRef}
            />
          </div>

          <Button
            onClick={downloadQRCode}
            className="w-full"
            disabled={qrType === "text" ? !text : !ssid}
          >
            {t.download}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default QRCodeGenerator;
