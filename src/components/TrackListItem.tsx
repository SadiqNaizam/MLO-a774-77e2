import React from 'react';
import { Play, Pause, MoreHorizontal, Music2, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button'; // For potential actions

interface TrackListItemProps {
  trackNumber?: number | string; // Can be number or an icon like a speaker for currently playing
  title: string;
  artist: string;
  album?: string;
  duration: string; // e.g., "3:45"
  imageUrl?: string; // Optional: small thumbnail
  isPlaying?: boolean; // Is this specific track currently playing?
  isActive?: boolean; // Is this track the active one in the list (e.g. highlighted, even if paused)
  isLiked?: boolean;
  onPlayClick: () => void; // Called when play/pause for this item is clicked
  onItemClick?: () => void; // Called when the item itself is clicked (e.g., to select, not necessarily play)
  onLikeClick?: () => void;
  onMoreOptionsClick?: () => void;
}

const TrackListItem: React.FC<TrackListItemProps> = ({
  trackNumber,
  title,
  artist,
  album,
  duration,
  imageUrl,
  isPlaying,
  isActive,
  isLiked,
  onPlayClick,
  onItemClick,
  onLikeClick,
  onMoreOptionsClick,
}) => {
  console.log(`Rendering TrackListItem: ${title}, isActive: ${isActive}, isPlaying: ${isPlaying}`);

  return (
    <div
      className={cn(
        "flex items-center p-3 space-x-4 rounded-lg group transition-colors duration-150",
        isActive ? "bg-sky-100/70" : "hover:bg-slate-100/50", // Doraemon blue subtle highlight
        onItemClick ? "cursor-pointer" : ""
      )}
      onClick={onItemClick}
      role="button"
      tabIndex={onItemClick ? 0 : -1}
      onKeyDown={(e) => { if (e.key === 'Enter' && onItemClick) onItemClick(); }}
    >
      {/* Track Number / Play Icon */}
      <div className="w-8 text-center flex items-center justify-center">
        {isActive && isPlaying ? (
          <Pause
            className="h-5 w-5 text-sky-500 cursor-pointer group-hover:text-sky-600"
            onClick={(e) => { e.stopPropagation(); onPlayClick(); }}
          />
        ) : isActive && !isPlaying ? (
          <Play
            className="h-5 w-5 text-sky-500 cursor-pointer group-hover:text-sky-600 fill-sky-500"
            onClick={(e) => { e.stopPropagation(); onPlayClick(); }}
          />
        ) : (
          <>
            <span className="text-sm text-slate-500 group-hover:hidden">{trackNumber || <Music2 className="h-4 w-4 text-slate-400"/>}</span>
            <Play
              className="h-5 w-5 text-slate-600 cursor-pointer hidden group-hover:block fill-slate-600"
              onClick={(e) => { e.stopPropagation(); onPlayClick(); }}
            />
          </>
        )}
      </div>

      {/* Optional Image */}
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-10 h-10 rounded object-cover" />
      )}

      {/* Title and Artist */}
      <div className="flex-grow min-w-0">
        <p className={cn("text-sm font-medium truncate", isActive ? "text-sky-600" : "text-slate-800")}>{title}</p>
        <p className="text-xs text-slate-500 truncate">{artist}</p>
      </div>

      {/* Album (Optional) - hidden on smaller screens by default example */}
      {album && <p className="text-sm text-slate-600 truncate hidden md:block w-1/4">{album}</p>}

      {/* Like Button */}
      {onLikeClick && (
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-pink-500" onClick={(e) => { e.stopPropagation(); onLikeClick(); }}>
            <Heart className={cn("h-4 w-4", isLiked ? "fill-pink-500 text-pink-500" : "")}/>
          </Button>
      )}

      {/* Duration */}
      <p className="text-sm text-slate-500 w-12 text-right">{duration}</p>

      {/* More Options */}
      {onMoreOptionsClick && (
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600" onClick={(e) => { e.stopPropagation(); onMoreOptionsClick(); }}>
            <MoreHorizontal className="h-5 w-5" />
          </Button>
      )}
    </div>
  );
};

export default TrackListItem;