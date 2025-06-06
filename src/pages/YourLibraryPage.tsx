import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import GlobalPlayerBar from '@/components/layout/GlobalPlayerBar';
import ThemedSectionHeader from '@/components/ThemedSectionHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentGridCard from '@/components/ContentGridCard';
import TrackListItem from '@/components/TrackListItem';
import { Button } from '@/components/ui/button';
import { PlusCircle, ListMusic, Heart, Disc3, Mic2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Placeholder data
const placeholderUserPlaylists = [
  { id: 'playlist_lib_1', title: 'My Awesome Mix Vol. 1', imageUrl: 'https://source.unsplash.com/random/400x400?playlist,abstract3', description: '25 tracks of pure joy', type: 'Playlist' },
  { id: 'playlist_lib_2', title: 'Doraemon\'s Pocket Tunes', imageUrl: 'https://source.unsplash.com/random/400x400?playlist,robot,blue', description: 'Magical melodies', type: 'Playlist' },
];
const placeholderLikedSongs = [
  { id: 'liked_1', title: 'Dreaming On (Doraemon Remix)', artist: 'The Sleepers ft. Nobita', album: 'Nightscapes', duration: '3:45', imageUrl: 'https://source.unsplash.com/random/50x50?song,dream,blue', isLiked: true },
  { id: 'liked_2', title: 'Sky High Adventures', artist: 'Aviators United', album: 'Clouds & Beyond', duration: '2:50', imageUrl: 'https://source.unsplash.com/random/50x50?song,sky,adventure', isLiked: true },
  { id: 'liked_3', title: 'Future Gadget Groove', artist: 'Dr. Robotnik', album: 'Robotic Rhythms', duration: '4:12', imageUrl: 'https://source.unsplash.com/random/50x50?song,future,tech', isLiked: true },
];
const placeholderSavedAlbums = [
    { id: 'album_lib_1', title: 'Echoes in Time Portal', imageUrl: 'https://source.unsplash.com/random/400x400?album,vintage,portal', description: 'By The Time Travelers', type: 'Album' },
    { id: 'album_lib_2', title: 'Neon Future City', imageUrl: 'https://source.unsplash.com/random/400x400?album,neon,city', description: 'By Cyber Syndicate Blue', type: 'Album' },
];
const placeholderFollowedArtists = [
    { id: 'artist_lib_1', title: 'The Gadgeteers', imageUrl: 'https://source.unsplash.com/random/400x400?band,tech,blue', description: 'Inventive sounds', type: 'Artist' },
];


const mockTrackLibrary = {
  id: 'track_lib_player_default',
  title: 'Library Serenity',
  artist: 'Librarian Bot',
  imageUrl: 'https://source.unsplash.com/random/100x100?books,music,calm',
  duration: 210,
  isLiked: false,
};

const YourLibraryPage = () => {
  console.log('YourLibraryPage loaded');
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('playlists');

  const [currentTrack, setCurrentTrack] = useState<any>(mockTrackLibrary);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(40);
  const [volume, setVolume] = useState(70);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNext = () => console.log('Next track');
  const handlePrevious = () => console.log('Previous track');
  const handleSeek = (newProgress: number[]) => setProgress(newProgress[0]);
  const handleVolumeChange = (newVolume: number[]) => setVolume(newVolume[0]);
  
  const [likedSongsList, setLikedSongsList] = useState(placeholderLikedSongs);

  const handleLikeToggle = (trackId: string, fromPlayer: boolean = false) => {
    console.log('Toggled like for track:', trackId);
    if(currentTrack && currentTrack.id === trackId && fromPlayer) {
      setCurrentTrack((prev: any) => ({...prev, isLiked: !prev.isLiked}));
    }
    // This is a simplistic toggle for the demo. A real app would update backend.
    setLikedSongsList(prevSongs => 
      prevSongs.map(song => song.id === trackId ? {...song, isLiked: !song.isLiked } : song)
    );
  };

  const handlePlayTrack = (track: any) => {
    setCurrentTrack({
        id: track.id,
        title: track.title,
        artist: track.artist,
        imageUrl: track.imageUrl || 'https://source.unsplash.com/random/100x100?library,song,blue',
        duration: parseInt(track.duration.split(':')[0])*60 + parseInt(track.duration.split(':')[1]) || 190,
        isLiked: track.isLiked, // Use the track's current liked status
    });
    setIsPlaying(true);
    console.log('Playing track from library:', track.title);
  };

  const handleCardClick = (itemType: string, id: string | number) => {
    console.log(`Library item clicked: ${id} (type: ${itemType}). Navigating...`);
    navigate(`/content/${itemType.toLowerCase()}/${id}`);
  };
  
  const handlePlayCard = (item: {id: string|number, title?: string, imageUrl?: string, type?: string}) => {
     console.log(`Play clicked for library card: ${item.id}.`);
     // For simplicity, playing a card might mean playing its first track or a representative track
     if (item.type === 'Album' || item.type === 'Playlist') {
        setCurrentTrack({
            id: `lib_play_${item.id}`,
            title: `First track of ${item.title}`,
            artist: item.type === 'Artist' ? item.title : 'Various Artists',
            imageUrl: item.imageUrl || 'https://source.unsplash.com/random/100x100?music',
            duration: 200,
            isLiked: false,
        });
        setIsPlaying(true);
     } else {
        console.log("Cannot directly play this card type from library in this mock.")
     }
  };

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 pl-64 pb-24 overflow-y-auto">
        <div className="p-6 space-y-6">
          <ThemedSectionHeader title="Your Music Library" subtitle="All your saved music in one place." />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-slate-200/70 rounded-lg p-1">
              <TabsTrigger value="playlists" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white rounded-md data-[state=active]:shadow-sm"><ListMusic className="mr-2 h-4 w-4 inline-block"/>Playlists</TabsTrigger>
              <TabsTrigger value="songs" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white rounded-md data-[state=active]:shadow-sm"><Heart className="mr-2 h-4 w-4 inline-block"/>Liked Songs</TabsTrigger>
              <TabsTrigger value="albums" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white rounded-md data-[state=active]:shadow-sm"><Disc3 className="mr-2 h-4 w-4 inline-block"/>Albums</TabsTrigger>
              <TabsTrigger value="artists" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white rounded-md data-[state=active]:shadow-sm"><Mic2 className="mr-2 h-4 w-4 inline-block"/>Artists</TabsTrigger>
            </TabsList>

            <TabsContent value="playlists" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-slate-700">Your Playlists</h3>
                <Button variant="outline" className="border-sky-500 text-sky-500 hover:bg-sky-100 hover:text-sky-600 rounded-full shadow-sm">
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Playlist
                </Button>
              </div>
              {placeholderUserPlaylists.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {placeholderUserPlaylists.map(playlist => (
                    <ContentGridCard key={playlist.id} {...playlist} onClick={() => handleCardClick('playlist', playlist.id)} onPlayClick={() => handlePlayCard(playlist)} />
                  ))}
                </div>
              ) : (
                 <p className="text-slate-500 py-8 text-center">You haven't created any playlists yet. Create one to get started!</p>
              )}
            </TabsContent>

            <TabsContent value="songs" className="mt-6">
              <h3 className="text-xl font-semibold mb-4 text-slate-700">Liked Songs ({likedSongsList.filter(s => s.isLiked).length})</h3>
              {likedSongsList.filter(s => s.isLiked).length > 0 ? (
                <div className="space-y-1">
                  {likedSongsList.filter(s => s.isLiked).map((track, index) => (
                    <TrackListItem
                      key={track.id}
                      trackNumber={index + 1}
                      {...track}
                      isPlaying={currentTrack?.id === track.id && isPlaying}
                      isActive={currentTrack?.id === track.id}
                      onPlayClick={() => handlePlayTrack(track)}
                      onLikeClick={() => handleLikeToggle(track.id)}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 py-8 text-center">You haven't liked any songs yet. Start exploring!</p>
              )}
            </TabsContent>

            <TabsContent value="albums" className="mt-6">
              <h3 className="text-xl font-semibold mb-4 text-slate-700">Saved Albums</h3>
              {placeholderSavedAlbums.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {placeholderSavedAlbums.map(album => (
                    <ContentGridCard key={album.id} {...album} onClick={() => handleCardClick('album', album.id)} onPlayClick={() => handlePlayCard(album)} />
                  ))}
                </div>
              ) : (
                 <p className="text-slate-500 py-8 text-center">No albums saved yet. Discover new music and save your favorites.</p>
              )}
            </TabsContent>
            
            <TabsContent value="artists" className="mt-6">
              <h3 className="text-xl font-semibold mb-4 text-slate-700">Followed Artists</h3>
              {placeholderFollowedArtists.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                 {placeholderFollowedArtists.map(artist => (
                    <ContentGridCard key={artist.id} {...artist} onClick={() => handleCardClick('artist', artist.id)} onPlayClick={() => handlePlayCard(artist)} />
                  ))}
                </div>
              ): (
                 <p className="text-slate-500 py-8 text-center">You are not following any artists yet. Find artists you love and follow them.</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <GlobalPlayerBar currentTrack={currentTrack} isPlaying={isPlaying} progress={progress} volume={volume} onPlayPause={handlePlayPause} onNext={handleNext} onPrevious={handlePrevious} onSeek={handleSeek} onVolumeChange={handleVolumeChange} onLikeToggle={(id) => handleLikeToggle(id, true)} />
    </div>
  );
};

export default YourLibraryPage;