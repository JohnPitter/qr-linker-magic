import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { translations, TranslationKey } from "@/utils/translations";

interface WifiFormProps {
  ssid: string;
  setSsid: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  encryption: string;
  setEncryption: (value: string) => void;
  t: Record<TranslationKey, string>;
}

const WifiForm = ({
  ssid,
  setSsid,
  password,
  setPassword,
  encryption,
  setEncryption,
  t,
}: WifiFormProps) => {
  return (
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
  );
};

export default WifiForm;