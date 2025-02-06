import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [qrColor, setQrColor] = useState("#000000");
  const qrRef = useRef<SVGSVGElement>(null);
  const { toast } = useToast();

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
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text or URL"
            className="w-full"
          />
          <Input
            type="color"
            value={qrColor}
            onChange={(e) => setQrColor(e.target.value)}
            className="w-full h-10"
          />
          <div className="flex justify-center p-4 bg-white rounded-lg">
            <QRCodeSVG
              value={text || "https://example.com"}
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
            disabled={!text}
          >
            Download QR Code
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default QRCodeGenerator;