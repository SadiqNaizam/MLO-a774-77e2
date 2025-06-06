import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import GlobalPlayerBar from '@/components/layout/GlobalPlayerBar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrackListItem from '@/components/TrackListItem';
import ContentGridCard from '@/components/ContentGridCard';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon, Music, Disc, Mic2V } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Placeholder data
const placeholderTracks = [
  { id: 'track_search_1', title: 'Found You Melody', artist: 'Search Results Band', album: 'Query Album', duration: '3:15', imageUrl: 'https://source.unsplash.com/random/50x50?music,song1', isLiked: false },
  { id: 'track_search_2', title: 'Searching High and Low', artist: 'Data Miners', album: 'Hit Singles', duration: '4:02', imageUrl: 'https://source.unsplash.com/random/50x50?music,song2', isLiked: true },
  { id: 'track_search_3', title: 'Keyword Serenade', artist: 'The Indexers', album: 'Top Charts', duration: '2:55', imageUrl: 'https://source.unsplash.com/random/50x50?music,song3', isLiked: false },
];

const placeholderAlbums = [
  { id: 'album_search_1', title: 'Discovery Path', imageUrl: 'https://source.unsplash.com/random/400x400?album,cover3', description: 'Collection of found gems', type: 'Album' },
  { id: 'album_search_2', title: 'Queried Harmonies', imageUrl: 'https://source.unsplash.com/random/400x400?album,cover4', description: 'Sounds matching your search', type: 'Album' },
];

const placeholderArtists = [
  { id: 'artist_search_1', title: 'The Echoes', imageUrl: 'https://source.unsplash.com/random/400x400?band,group', description: 'Popular rock band', type: 'Artist' },
];

const mockTrackSearch = {
  id: 'track_search_player_default',
  title: 'Ready to Search',
  artist: 'System AI',
  imageUrl: 'https://source.unsplash.com/random/100x100?soundwave,blue',
  duration: 180,
  isLiked: false,
};


const SearchPage = () => {
  console.log('SearchPage loaded');
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const [currentTrack, setCurrentTrack] = useState<any>(mockTrackSearch);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(10);
  const [volume, setVolume] = useState(60);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNext = () => console.log('Next track');
  const handlePrevious = () => console.log('Previous track');
  const handleSeek = (newProgress: number[]) => setProgress(newProgress[0]);
  const handleVolumeChange = (newVolume: number[]) => setVolume(newVolume[0]);
  const handleLikeToggle = (trackId: string) => {
    console.log('Toggled like for track:', trackId);
    if(currentTrack && currentTrack.id === trackId) {
      setCurrentTrack((prev: any) => ({...prev, isLiked: !prev.isLiked}));
    }
    // also update the list item if it exists
  };

  const handlePlayTrack = (track: any) => {
    setCurrentTrack({
        id: track.id,
        title: track.title,
        artist: track.artist,
        imageUrl: track.imageUrl || 'https://source.unsplash.com/random/100x100?note,blue',
        duration: parseInt(track.duration.split(':')[0])*60 + parseInt(track.duration.split(':')[1]) || 200,
        isLiked: track.isLiked || false,
    });
    setIsPlaying(true);
    console.log('Playing track:', track.title);
  };

  const handleCardClick = (itemType: string, id: string | number) => {
    console.log(`Search result card clicked: ${id}, type: ${itemType}. Navigating...`);
    navigate(`/content/${itemType.toLowerCase()}/${id}`);
  };
  
  const handlePlayCard = (item: {id: string|number, title?: string, imageUrl?: string, type?: string}) => {
     console.log(`Play clicked for card: ${item.id}.`);
     // For simplicity, playing a card might mean playing its first track or a representative track
     // Here, we'll just simulate setting it as current track if it's playable content
     if (item.type === 'Album' || item.type === 'Playlist') {
        setCurrentTrack({
            id: `album_play_${item.id}`,
            title: `First track of ${item.title}`,
            artist: 'Various Artists',
            imageUrl: item.imageUrl || 'https://source.unsplash.com/random/100x100?music',
            duration: 200,
            isLiked: false,
        });
        setIsPlaying(true);
     } else {
        console.log("Cannot directly play this card type from search results in this mock.")
     }
  };


  const performSearch = () => {
    if (!searchTerm.trim()) return;
    console.log(`Searching for: ${searchTerm}`);
    // Actual search logic would go here, for now, we just show placeholders
    // Potentially filter placeholder data based on searchTerm for a more dynamic feel
  };

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 pl-64 pb-24 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="sticky top-0 z-10 bg-slate-100/80 backdrop-blur-md pt-4 pb-2 -mx-6 px-6">
            <div className="relative max-w-xl mx-auto">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                type="search"
                placeholder="What do you want to listen to?"
                className="w-full pl-12 pr-4 py-3 rounded-full border-slate-300 focus:border-sky-500 focus:ring-sky-500 bg-white shadow-md text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && performSearch()}
                />
            </div>
          </div>

          {searchTerm ? (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 md:grid-cols-5 bg-slate-200/70 rounded-lg p-1">
                <TabsTrigger value="all" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white rounded-md data-[state=active]:shadow-sm">All</TabsTrigger>
                <TabsTrigger value="tracks" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white rounded-md data-[state=active]:shadow-sm">Tracks</TabsTrigger>
                <TabsTrigger value="albums" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white rounded-md data-[state=active]:shadow-sm">Albums</TabsTrigger>
                <TabsTrigger value="artists" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white rounded-md data-[state=active]:shadow-sm">Artists</TabsTrigger>
                <TabsTrigger value="playlists" className="hidden md:flex data-[state=active]:bg-sky-500 data-[state=active]:text-white rounded-md data-[state=active]:shadow-sm">Playlists</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6 space-y-8">
                <div>
                    <h3 className="text-xl font-semibold mb-3 text-slate-700 flex items-center"><Music className="mr-2 h-5 w-5 text-sky-600"/> Tracks</h3>
                    <div className="space-y-1">
                        {placeholderTracks.map((track, index) => (
                            <TrackListItem key={track.id} trackNumber={index + 1} {...track} isPlaying={currentTrack?.id === track.id && isPlaying} isActive={currentTrack?.id === track.id} onPlayClick={() => handlePlayTrack(track)} onLikeClick={() => handleLikeToggle(track.id)} />
                        ))}
                    </div>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold mb-3 text-slate-700 flex items-center"><Disc className="mr-2 h-5 w-5 text-sky-600"/> Albums</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {placeholderAlbums.map(album => ( <ContentGridCard key={album.id} {...album} onClick={() => handleCardClick('album', album.id)} onPlayClick={() => handlePlayCard(album)} /> ))}
                    </div>
                </div>
              </TabsContent>

              <TabsContent value="tracks" className="mt-6">
                <h3 className="text-xl font-semibold mb-4 text-slate-700">All Tracks matching "{searchTerm}"</h3>
                 <div className="space-y-1">
                    {placeholderTracks.map((track, index) => ( <TrackListItem key={track.id} trackNumber={index + 1} {...track} isPlaying={currentTrack?.id === track.id && isPlaying} isActive={currentTrack?.id === track.id} onPlayClick={() => handlePlayTrack(track)} onLikeClick={() => handleLikeToggle(track.id)} /> ))}
                 </div>
              </TabsContent>
              <TabsContent value="albums" className="mt-6">
                 <h3 className="text-xl font-semibold mb-4 text-slate-700">Albums matching "{searchTerm}"</h3>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {placeholderAlbums.map(album => ( <ContentGridCard key={album.id} {...album} onClick={() => handleCardClick('album', album.id)} onPlayClick={() => handlePlayCard(album)} /> ))}
                </div>
              </TabsContent>
              <TabsContent value="artists" className="mt-6">
                <h3 className="text-xl font-semibold mb-4 text-slate-700 flex items-center"><Mic2V className="mr-2 h-5 w-5 text-sky-600"/> Artists matching "{searchTerm}"</h3>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {placeholderArtists.map(artist => ( <ContentGridCard key={artist.id} {...artist} onClick={() => handleCardClick('artist', artist.id)} onPlayClick={() => handlePlayCard(artist)} /> ))}
                </div>
                {placeholderArtists.length === 0 && <p className="text-slate-500">No artists found for "{searchTerm}".</p>}
              </TabsContent>
               <TabsContent value="playlists" className="mt-6">
                <h3 className="text-xl font-semibold mb-4 text-slate-700">Playlists matching "{searchTerm}"</h3>
                 <p className="text-slate-500">No playlists found for "{searchTerm}". Add some to see results.</p>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="text-center py-20">
                <SearchIcon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-xl text-slate-500">Search for your favorite songs, artists, and albums.</p>
                <p className="text-sm text-slate-400 mt-2">Let Doraemon's magic pocket find them for you!</p>
            </div>
          )}
        </div>
      </main>
      <GlobalPlayerBar currentTrack={currentTrack} isPlaying={isPlaying} progress={progress} volume={volume} onPlayPause={handlePlayPause} onNext={handleNext} onPrevious={handlePrevious} onSeek={handleSeek} onVolumeChange={handleVolumeChange} onLikeToggle={handleLikeToggle} />
    </div>
  );
};

export default SearchPage;