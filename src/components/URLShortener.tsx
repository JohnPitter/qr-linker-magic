import { useState } from "react";
import { motion } from "framer-motion";
import copy from "copy-to-clipboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const URLShortener = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const shortenUrl = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
      const data = await response.json();
      if (data.ok) {
        setShortUrl(data.result.full_short_link);
      } else {
        toast({
          title: "Error",
          description: "Please enter a valid URL",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to shorten URL",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const copyToClipboard = () => {
    copy(shortUrl);
    toast({
      title: "Success",
      description: "URL copied to clipboard!",
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
            placeholder="Enter long URL"
            className="w-full"
          />
          <Button
            onClick={shortenUrl}
            className="w-full"
            disabled={!url || isLoading}
          >
            {isLoading ? "Shortening..." : "Shorten URL"}
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
                Copy to Clipboard
              </Button>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default URLShortener;