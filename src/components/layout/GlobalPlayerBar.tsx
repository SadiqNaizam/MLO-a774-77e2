import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize2, Minimize2, Heart, ListMusic } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CurrentTrack {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  duration: number; // in seconds
  isLiked?: boolean;
}

interface GlobalPlayerBarProps {
  currentTrack: CurrentTrack | null;
  isPlaying: boolean;
  progress: number; // 0-100 percentage of track progress
  volume: number; // 0-100
  isMuted?: boolean;
  isFullScreen?: boolean; // Example for potential full screen player toggle
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (value: number[]) => void; // Slider typically gives [value]
  onVolumeChange: (value: number[]) => void;
  onMuteToggle?: () => void;
  onLikeToggle?: (trackId: string) => void;
  onQueueToggle?: () => void;
  onFullScreenToggle?: () => void;
}

const formatTime = (seconds: number): string => {
  const flooredSeconds = Math.floor(seconds);
  const min = Math.floor(flooredSeconds / 60);
  const sec = flooredSeconds % 60;
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
};

const GlobalPlayerBar: React.FC<GlobalPlayerBarProps> = ({
  currentTrack,
  isPlaying,
  progress,
  volume,
  isMuted,
  isFullScreen,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
  onMuteToggle,
  onLikeToggle,
  onQueueToggle,
  onFullScreenToggle,
}) => {
  console.log("Rendering GlobalPlayerBar, track:", currentTrack?.title, "isPlaying:", isPlaying);

  if (!currentTrack) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-slate-100 border-t border-slate-200 flex items-center justify-center z-50">
        <p className="text-slate-500">No track selected.</p>
      </div>
    );
  }

  const currentTime = (progress / 100) * currentTrack.duration;

  return (
    <div className={cn(
        "fixed bottom-0 left-0 right-0 h-24 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-t-lg z-50",
        "p-4 flex items-center justify-between space-x-4 rounded-t-2xl" // Doraemon-esque: rounded top corners
    )}>
      {/* Track Info */}
      <div className="flex items-center space-x-3 w-1/4 min-w-[200px]">
        <AspectRatio ratio={1/1} className="w-14 h-14 rounded-md overflow-hidden">
            <img src={currentTrack.imageUrl || '/placeholder.svg'} alt={currentTrack.title} className="object-cover w-full h-full" />
        </AspectRatio>
        <div>
          <p className="text-sm font-semibold text-slate-800 truncate">{currentTrack.title}</p>
          <p className="text-xs text-slate-500 truncate">{currentTrack.artist}</p>
        </div>
        {onLikeToggle && (
            <Button variant="ghost" size="icon" onClick={() => onLikeToggle(currentTrack.id)} className="ml-2 text-slate-500 hover:text-pink-500">
                <Heart className={cn("h-5 w-5", currentTrack.isLiked ? "fill-pink-500 text-pink-500" : "")}/>
            </Button>
        )}
      </div>

      {/* Playback Controls & Progress */}
      <div className="flex flex-col items-center flex-grow max-w-xl">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={onPrevious} className="text-slate-600 hover:text-sky-600">
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={onPlayPause}
            className="h-10 w-10 rounded-full bg-sky-500 hover:bg-sky-600 text-white shadow-md" // Doraemon blue play button
          >
            {isPlaying ? <Pause className="h-5 w-5 fill-white" /> : <Play className="h-5 w-5 fill-white" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onNext} className="text-slate-600 hover:text-sky-600">
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center space-x-2 w-full mt-1">
          <span className="text-xs text-slate-500 w-10 text-right">{formatTime(currentTime)}</span>
          <Slider
            defaultValue={[0]}
            value={[progress]}
            max={100}
            step={0.1}
            onValueChange={onSeek}
            className="flex-grow data-[disabled]:opacity-50"
            aria-label="Track progress"
          />
          <span className="text-xs text-slate-500 w-10 text-left">{formatTime(currentTrack.duration)}</span>
        </div>
      </div>

      {/* Volume & Other Controls */}
      <div className="flex items-center space-x-2 w-1/4 min-w-[150px] justify-end">
        {onQueueToggle && (
            <Button variant="ghost" size="icon" onClick={onQueueToggle} className="text-slate-500 hover:text-sky-600">
                <ListMusic className="h-5 w-5" />
            </Button>
        )}
        {onMuteToggle && (
            <Button variant="ghost" size="icon" onClick={onMuteToggle} className="text-slate-500 hover:text-sky-600">
            {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
        )}
        <Slider
          defaultValue={[50]}
          value={[isMuted ? 0 : volume]}
          max={100}
          step={1}
          onValueChange={onVolumeChange}
          className="w-24 data-[disabled]:opacity-50"
          aria-label="Volume"
          disabled={isMuted}
        />
        {onFullScreenToggle && (
            <Button variant="ghost" size="icon" onClick={onFullScreenToggle} className="text-slate-500 hover:text-sky-600">
            {isFullScreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </Button>
        )}
      </div>
    </div>
  );
};

export default GlobalPlayerBar;