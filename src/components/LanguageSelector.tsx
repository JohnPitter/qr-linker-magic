import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector = ({ currentLanguage, onLanguageChange }: LanguageSelectorProps) => {
  const languages = {
    en: "English",
    es: "Español",
    pt: "Português",
    fr: "Français",
    ru: "Русский",
    zh: "中文",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-auto px-3 flex gap-2">
          <Globe className="h-4 w-4" />
          <span>{languages[currentLanguage as keyof typeof languages]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        {Object.entries(languages).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => onLanguageChange(code)}
            className="flex gap-2"
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;