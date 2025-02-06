import { useState } from "react";
import { motion } from "framer-motion";
import copy from "copy-to-clipboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const URLShortener = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
          title: "Success",
          description: "URL shortened successfully!",
        });
      } else {
        throw new Error('Invalid response from URL shortening service');
      }
    } catch (error) {
      console.error('URL shortening error:', error);
      toast({
        title: "Error",
        description: "Failed to shorten URL. Please try again later.",
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