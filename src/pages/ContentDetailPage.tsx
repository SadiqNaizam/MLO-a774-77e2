import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import GlobalPlayerBar from '@/components/layout/GlobalPlayerBar';
import ThemedSectionHeader from '@/components/ThemedSectionHeader';
import TrackListItem from '@/components/TrackListItem';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { PlayCircle, Shuffle, Heart, UserCircle, ListMusic } from 'lucide-react';

// Placeholder data
const sampleData: Record<string, Record<string, any>> = {
  playlist: {
    'chill-vibes-mix': {
      id: 'chill-vibes-mix', type: 'Playlist', name: 'Chill Vibes Mix (Doraemon\'s Pick)', creator: 'DJ Aura Blue',
      description: 'A curated selection of relaxing tunes from Doraemon\'s future gadget collection. Perfect for unwinding.',
      imageUrl: 'https://source.unsplash.com/random/600x600?abstract,chill,blue',
      tracks: [
        { id: 'track_cv_1', title: 'Gentle Breeze of Future', artist: 'Wind Whisperers', album: 'Serene Sounds', duration: '3:20', imageUrl: 'https://source.unsplash.com/random/50x50?nature,calm,blue', isLiked: false },
        { id: 'track_cv_2', title: 'Floating on Time Kerchief', artist: 'Dream Fiend', album: 'Lucid States', duration: '4:10', imageUrl: 'https://source.unsplash.com/random/50x50?sky,clouds,blue', isLiked: true },
        { id: 'track_cv_3', title: 'Quietude in Nobita\'s Room', artist: 'Silent Motion', album: 'Stillness', duration: '5:05', imageUrl: 'https://source.unsplash.com/random/50x50?zen,garden,blue', isLiked: false },
      ], isFavorite: false,
    },
  },
  album: {
    'cosmic-echoes': {
      id: 'cosmic-echoes', type: 'Album', name: 'Cosmic Echoes of the Galaxy', creator: 'Galaxy Drifters ft. Dorami',
      description: 'An epic journey through soundscapes and interstellar melodies. Explore the universe with Dorami!',
      imageUrl: 'https://source.unsplash.com/random/600x600?space,galaxy,yellow',
      tracks: [
        { id: 'track_ce_1', title: 'Nebula Dreams (Yellow Remix)', artist: 'Galaxy Drifters', album: 'Cosmic Echoes', duration: '5:15', imageUrl: 'https://source.unsplash.com/random/50x50?nebula,yellow', isLiked: false },
        { id: 'track_ce_2', title: 'Starlight Path to the Future', artist: 'Galaxy Drifters', album: 'Cosmic Echoes', duration: '4:30', imageUrl: 'https://source.unsplash.com/random/50x50?stars,yellow', isLiked: true },
      ], isFavorite: true,
    }
  },
  artist: {
    'aurora-keys': {
        id: 'aurora-keys', type: 'Artist', name: 'Aurora Keys',
        description: 'Multi-talented artist known for ethereal electronic soundscapes and vibrant live performances.',
        imageUrl: 'https://source.unsplash.com/random/600x600?portrait,musician,aurora',
        tracks: [ // Top tracks by artist
             { id: 'track_ak_1', title: 'Northern Lights', artist: 'Aurora Keys', album: 'Polaris', duration: '4:15', imageUrl: 'https://source.unsplash.com/random/50x50?aurora,song', isLiked: false },
             { id: 'track_ak_2', title: 'Crystal Cave', artist: 'Aurora Keys', album: 'Geodes', duration: '3:50', imageUrl: 'https://source.unsplash.com/random/50x50?crystal,song', isLiked: true },
        ], isFavorite: true,
    }
  }
};

const mockTrackDetail = {
  id: 'track_detail_player_default', title: 'Select a Track', artist: 'Music Player',
  imageUrl: 'https://source.unsplash.com/random/100x100?musicnote,blue', duration: 220, isLiked: false,
};

const ContentDetailPage = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const [contentData, setContentData] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  console.log(`ContentDetailPage loaded for type: ${type}, id: ${id}`);

  useEffect(() => {
    if (type && id && sampleData[type] && sampleData[type][id]) {
      const data = sampleData[type][id];
      setContentData(data);
      setIsFavorite(data.isFavorite || false);
    } else {
      setContentData({ name: 'Content Not Found', tracks: [], description: 'The requested content could not be found.', imageUrl: 'https://source.unsplash.com/random/600x600?error,questionmark', type: 'Error' });
    }
  }, [type, id]);

  const [currentTrack, setCurrentTrack] = useState<any>(mockTrackDetail);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNext = () => console.log('Next track in queue');
  const handlePrevious = () => console.log('Previous track in queue');
  const handleSeek = (newProgress: number[]) => setProgress(newProgress[0]);
  const handleVolumeChange = (newVolume: number[]) => setVolume(newVolume[0]);

  const handleGlobalLikeToggle = (trackId: string) => {
    console.log('Toggled like for current playing track:', trackId);
    if(currentTrack && currentTrack.id === trackId) {
      setCurrentTrack((prev: any) => ({...prev, isLiked: !prev.isLiked}));
    }
    // Also update in main list if present
    setContentData((prevData: any) => ({
      ...prevData,
      tracks: prevData.tracks?.map((t:any) => t.id === trackId ? {...t, isLiked: !t.isLiked} : t) || []
    }));
  };
  
  const handleTrackLikeToggle = (trackId: string) => {
    console.log('Toggled like for track in list:', trackId);
    setContentData((prevData: any) => ({
        ...prevData,
        tracks: prevData.tracks.map((t:any) => t.id === trackId ? {...t, isLiked: !t.isLiked} : t)
    }));
    if(currentTrack && currentTrack.id === trackId) {
      setCurrentTrack((prev: any) => ({...prev, isLiked: !prev.isLiked}));
    }
  };

  const handlePlayTrack = (track: any) => {
    setCurrentTrack({
        id: track.id, title: track.title, artist: track.artist,
        imageUrl: track.imageUrl || contentData?.imageUrl,
        duration: parseInt(track.duration.split(':')[0])*60 + parseInt(track.duration.split(':')[1]) || 200,
        isLiked: track.isLiked,
    });
    setIsPlaying(true);
    console.log('Playing track from detail page:', track.title);
  };

  const handlePlayAll = () => {
    if (contentData?.tracks?.length > 0) {
      handlePlayTrack(contentData.tracks[0]);
      console.log('Playing all tracks, starting with the first.');
    }
  };

  const handleToggleFavoriteContent = () => {
      setIsFavorite(!isFavorite);
      console.log(isFavorite ? 'Unfavorited' : 'Favorited', contentData?.name);
  }

  if (!contentData) {
    return (
      <div className="flex h-screen bg-slate-100">
        <Sidebar />
        <main className="flex-1 pl-64 pb-24 flex items-center justify-center"><p className="text-xl text-slate-500">Loading content...</p></main>
        <GlobalPlayerBar currentTrack={null} isPlaying={false} progress={0} volume={volume} onPlayPause={() => {}} onNext={() => {}} onPrevious={() => {}} onSeek={() => {}} onVolumeChange={handleVolumeChange} />
      </div>
    );
  }
  
  const IconForType = contentData.type === 'Playlist' ? ListMusic : contentData.type === 'Artist' ? UserCircle : Disc3;


  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 pl-64 pb-24 overflow-y-auto">
        <div className="p-6 space-y-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink asChild><Link to={type === 'playlist' ? '/library' : (type === 'album' ? '/search' : '/search') }>{type ? type.charAt(0).toUpperCase() + type.slice(1) + 's' : 'Content'}</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>{contentData.name}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <header className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 p-6 bg-gradient-to-br from-sky-300 via-sky-100 to-slate-100 rounded-xl shadow-xl">
            <img src={contentData.imageUrl} alt={contentData.name} className="w-48 h-48 md:w-56 md:h-56 rounded-lg object-cover shadow-lg border-2 border-white" />
            <div className="flex flex-col justify-center space-y-3 py-2 text-center md:text-left flex-grow">
              <div>
                <Label htmlFor="contentType" className="text-xs font-semibold uppercase text-sky-700 tracking-wider flex items-center justify-center md:justify-start">
                    <IconForType className="w-4 h-4 mr-1.5"/> {contentData.type}
                </Label>
                <h1 id="contentType" className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mt-1 break-words">{contentData.name}</h1>
                {contentData.creator && <p className="text-md text-slate-600 mt-1.5">By {contentData.creator}</p>}
                <p className="text-sm text-slate-500 mt-2 max-w-prose">{contentData.description}</p>
              </div>
              <div className="flex items-center space-x-3 pt-3 justify-center md:justify-start">
                <Button size="lg" className="bg-sky-500 hover:bg-sky-600 text-white rounded-full shadow-md px-6" onClick={handlePlayAll} disabled={!contentData.tracks || contentData.tracks.length === 0}>
                  <PlayCircle className="mr-2 h-5 w-5 fill-white" /> Play All
                </Button>
                <Button variant="outline" size="lg" className="rounded-full shadow-sm border-slate-300 hover:bg-slate-200 px-6">
                  <Shuffle className="mr-2 h-5 w-5 text-sky-600" /> Shuffle
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full text-slate-500 hover:text-pink-500 w-10 h-10" onClick={handleToggleFavoriteContent}>
                    <Heart className={`h-6 w-6 ${isFavorite ? 'fill-pink-500 text-pink-500' : 'text-slate-500'}`} />
                </Button>
              </div>
            </div>
          </header>

          <ThemedSectionHeader title={contentData.type === 'Artist' ? "Top Tracks" : "Tracks"} subtitle={`${contentData.tracks?.length || 0} songs`} />
          <ScrollArea className="h-[calc(100vh-520px)] md:h-[calc(100vh-480px)] pr-2"> {/* Approximate height */}
            {contentData.tracks && contentData.tracks.length > 0 ? (
                <div className="space-y-1">
                {contentData.tracks.map((track: any, index: number) => (
                    <TrackListItem
                    key={track.id}
                    trackNumber={index + 1}
                    title={track.title}
                    artist={track.artist}
                    album={track.album || contentData.name}
                    duration={track.duration}
                    imageUrl={track.imageUrl}
                    isPlaying={currentTrack?.id === track.id && isPlaying}
                    isActive={currentTrack?.id === track.id}
                    isLiked={track.isLiked}
                    onPlayClick={() => handlePlayTrack(track)}
                    onLikeClick={() => handleTrackLikeToggle(track.id)}
                    onItemClick={() => handlePlayTrack(track)}
                    />
                ))}
                </div>
            ) : (
                <p className="text-slate-500 py-8 text-center">No tracks available for this {contentData.type?.toLowerCase()}.</p>
            )}
          </ScrollArea>
        </div>
      </main>
      <GlobalPlayerBar currentTrack={currentTrack} isPlaying={isPlaying} progress={progress} volume={volume} onPlayPause={handlePlayPause} onNext={handleNext} onPrevious={handlePrevious} onSeek={handleSeek} onVolumeChange={handleVolumeChange} onLikeToggle={handleGlobalLikeToggle} />
    </div>
  );
};

export default ContentDetailPage;