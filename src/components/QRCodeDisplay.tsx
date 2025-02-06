import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { TranslationKey } from "@/utils/translations";
import { forwardRef } from "react";

interface QRCodeDisplayProps {
  value: string;
  color: string;
  onDownload: () => void;
  disabled: boolean;
  t: Record<TranslationKey, string>;
}

const QRCodeDisplay = forwardRef<SVGSVGElement, QRCodeDisplayProps>(
  ({ value, color, onDownload, disabled, t }, ref) => {
    return (
      <div className="space-y-4">
        <div className="flex justify-center p-4 bg-white rounded-lg">
          <QRCodeSVG
            value={value}
            size={200}
            fgColor={color}
            level="H"
            includeMargin
            ref={ref}
          />
        </div>
        <Button onClick={onDownload} className="w-full" disabled={disabled}>
          {t.download}
        </Button>
      </div>
    );
  }
);

QRCodeDisplay.displayName = "QRCodeDisplay";

export default QRCodeDisplay;