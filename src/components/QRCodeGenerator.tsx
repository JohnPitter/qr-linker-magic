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

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [qrColor, setQrColor] = useState("#000000");
  const [qrType, setQrType] = useState<"text" | "wifi">("text");
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("WPA");
  const qrRef = useRef<SVGSVGElement>(null);
  const { toast } = useToast();

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
        title: "Success",
        description: "QR code downloaded successfully!",
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
            <Label>QR Code Type</Label>
            <Select
              value={qrType}
              onValueChange={(value: "text" | "wifi") => setQrType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select QR code type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text/URL</SelectItem>
                <SelectItem value="wifi">WiFi Network</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {qrType === "text" ? (
            <div className="space-y-2">
              <Label>Text or URL</Label>
              <Input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text or URL"
                className="w-full"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Network Name (SSID)</Label>
                <Input
                  type="text"
                  value={ssid}
                  onChange={(e) => setSsid(e.target.value)}
                  placeholder="Enter WiFi network name"
                />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter WiFi password"
                />
              </div>
              <div className="space-y-2">
                <Label>Security Type</Label>
                <Select value={encryption} onValueChange={setEncryption}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select security type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WPA">WPA/WPA2</SelectItem>
                    <SelectItem value="WEP">WEP</SelectItem>
                    <SelectItem value="nopass">No Password</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>QR Code Color</Label>
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
            Download QR Code
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default QRCodeGenerator;