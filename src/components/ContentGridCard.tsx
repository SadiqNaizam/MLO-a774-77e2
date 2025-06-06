import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContentGridCardProps {
  id: string | number;
  title: string;
  imageUrl: string;
  description?: string;
  type?: string; // e.g., Playlist, Album, Artist
  onClick?: (id: string | number) => void;
  onPlayClick?: (id: string | number) => void; // Optional: if card itself can trigger play
}

const ContentGridCard: React.FC<ContentGridCardProps> = ({
  id,
  title,
  imageUrl,
  description,
  type,
  onClick,
  onPlayClick,
}) => {
  console.log("Rendering ContentGridCard:", title);

  const handleCardClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click if play button is clicked
    if (onPlayClick) {
      onPlayClick(id);
    } else {
      console.log("Play clicked for:", title, "- (no specific onPlayClick handler, using onClick)");
      if (onClick) onClick(id); // Fallback to general onClick if no specific play handler
    }
  };

  return (
    <Card
      className={cn(
        "w-full overflow-hidden transition-all duration-300 group relative",
        "rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.03]", // Doraemon-esque: larger rounded corners, smooth scale
        "bg-white border-2 border-transparent hover:border-sky-400", // Doraemon blue accent on hover
        onClick ? "cursor-pointer" : ""
      )}
      onClick={!onPlayClick ? handleCardClick : undefined} // Only make card clickable if no specific play button action
    >
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={1 / 1} className="bg-slate-100 rounded-t-xl overflow-hidden">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
        {/* Play button overlay - appears on hover */}
        <Button
            variant="ghost"
            size="icon"
            className={cn(
                "absolute bottom-4 right-4 h-12 w-12 rounded-full bg-sky-500/80 text-white shadow-lg",
                "opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100",
                "hover:bg-sky-600"
            )}
            onClick={handlePlayClick}
            aria-label={`Play ${title}`}
        >
            <PlayCircle className="h-7 w-7 fill-white" />
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-md font-semibold text-slate-800 truncate" onClick={onClick ? handleCardClick : undefined}>{title}</CardTitle>
        {description && <p className="text-sm text-slate-500 mt-1 truncate">{description}</p>}
        {type && <p className="text-xs text-sky-600 mt-2 font-medium uppercase">{type}</p>}
      </CardContent>
      {/* Optional: CardFooter for more actions */}
    </Card>
  );
};

export default ContentGridCard;