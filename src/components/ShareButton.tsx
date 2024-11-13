import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';
import { Resource } from '../types';

interface ShareButtonProps {
  resource: Resource;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ resource }) => {
  const [copied, setCopied] = useState(false);

  const shareData = {
    title: `${resource.name} - Community Resource`,
    text: `Check out ${resource.name}: ${resource.description}`,
    url: window.location.href
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying to clipboard
      const text = `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
      aria-label="Share resource"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          {navigator.share ? <Share2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>Share</span>
        </>
      )}
    </button>
  );
};