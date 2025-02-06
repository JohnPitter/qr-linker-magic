import { useState, useRef } from "react";
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
import { translations } from "@/utils/translations";
import WifiForm from "./WifiForm";
import QRCodeDisplay from "./QRCodeDisplay";

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
            <WifiForm
              ssid={ssid}
              setSsid={setSsid}
              password={password}
              setPassword={setPassword}
              encryption={encryption}
              setEncryption={setEncryption}
              t={t}
            />
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

          <QRCodeDisplay
            ref={qrRef}
            value={getQRValue()}
            color={qrColor}
            onDownload={downloadQRCode}
            disabled={qrType === "text" ? !text : !ssid}
            t={t}
          />
        </div>
      </Card>
    </motion.div>
  );
};

export default QRCodeGenerator;