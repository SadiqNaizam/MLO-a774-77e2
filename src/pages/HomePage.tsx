import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ThemedSectionHeader from '@/components/ThemedSectionHeader';
import Carousel from '@/components/Carousel';
import ContentGridCard from '@/components/ContentGridCard';
import GlobalPlayerBar from '@/components/layout/GlobalPlayerBar';
import { useNavigate } from 'react-router-dom';

// Placeholder data
const placeholderCarouselSlides = [
  { id: 'playlist-future-beats', imageUrl: 'https://source.unsplash.com/random/800x450?vibrant,music', title: 'Featured: Future Beats', altText: 'Future Beats Playlist', type: 'playlist' },
  { id: 'album-cosmic-echoes', imageUrl: 'https://source.unsplash.com/random/800x450?galaxy,music', title: 'New Album: Cosmic Echoes', altText: 'Cosmic Echoes Album', type: 'album' },
  { id: 'artist-aurora-keys', imageUrl: 'https://source.unsplash.com/random/800x450?portrait,music', title: 'Spotlight: Aurora Keys', altText: 'Artist Aurora Keys', type: 'artist' },
];

const placeholderContentItems = [
  { id: 'playlist-chill-vibes', title: 'Chill Vibes Mix', imageUrl: 'https://source.unsplash.com/random/400x400?abstract,calm', description: 'Relax and unwind with these soothing tracks.', type: 'Playlist' },
  { id: 'playlist-energetic', title: 'Energetic Mornings', imageUrl: 'https://source.unsplash.com/random/400x400?abstract,vibrant', description: 'Start your day with a boost!', type: 'Playlist' },
  { id: 'album-indie-discoveries', title: 'Indie Discoveries', imageUrl: 'https://source.unsplash.com/random/400x400?music,indie', description: 'Fresh sounds from emerging artists.', type: 'Album' },
  { id: 'playlist-retro-rewind', title: 'Retro Rewind', imageUrl: 'https://source.unsplash.com/random/400x400?music,retro', description: 'Throwback to the classics.', type: 'Playlist' },
  { id: 'album-lofi-dreams', title: 'Lofi Dreams', imageUrl: 'https://source.unsplash.com/random/400x400?lofi,study', description: 'Beats to relax/study to.', type: 'Album' },
];

const mockTrack = {
  id: 'track-doraemon-uta',
  title: 'Doraemon no Uta',
  artist: 'Kumiko Osugi',
  imageUrl: 'https://source.unsplash.com/random/100x100?cat,robot,blue',
  duration: 180, // 3 minutes
  isLiked: false,
};

const HomePage = () => {
  console.log('HomePage loaded');
  const navigate = useNavigate();
  const [currentTrack, setCurrentTrack] = useState<any>(mockTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(25);
  const [volume, setVolume] = useState(50);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNext = () => console.log('Next track');
  const handlePrevious = () => console.log('Previous track');
  const handleSeek = (newProgress: number[]) => setProgress(newProgress[0]);
  const handleVolumeChange = (newVolume: number[]) => setVolume(newVolume[0]);
  const handleLikeToggle = (trackId: string) => {
    console.log('Toggled like for track:', trackId);
    setCurrentTrack((prev: any) => prev && prev.id === trackId ? {...prev, isLiked: !prev.isLiked} : prev);
  };

  const handleCardClick = (itemType: string, id: string | number) => {
    console.log(`Card clicked: ${id}, type: ${itemType}. Navigating to content detail...`);
    navigate(`/content/${itemType.toLowerCase()}/${id}`);
  };

  const handleCardPlay = (item: {id: string|number, title?: string, imageUrl?: string, type?: string}) => {
    console.log(`Play clicked for card: ${item.id}.`);
    setCurrentTrack({
        id: String(item.id),
        title: item.title || 'Sample Track',
        artist: item.type === 'Artist' ? item.title : 'Various Artists',
        imageUrl: item.imageUrl || 'https://source.unsplash.com/random/100x100?music',
        duration: 200,
        isLiked: false,
    });
    setIsPlaying(true);
  };

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 pl-64 pb-24 overflow-y-auto"> {/* Sidebar width, Player bar height */}
        <div className="p-6 space-y-10">
          <ThemedSectionHeader title="Welcome Back!" subtitle="Your daily dose of music, Doraemon style!" />

          <section>
            <ThemedSectionHeader title="Featured For You" ctaText="View All" onCtaClick={() => console.log('View All Featured')} />
            <Carousel
              slides={placeholderCarouselSlides.map(s => ({
                ...s,
                content: <div onClick={() => handleCardClick(s.type || 'playlist', s.id)} className="cursor-pointer h-full flex flex-col justify-end p-4 bg-gradient-to-t from-black/70 to-transparent"><h3 className="text-white text-lg font-bold">{s.title}</h3></div>,
                onPlayClick: () => handleCardPlay(s)
              }))}
              options={{ slidesToScroll: 1 }}
            />
          </section>

          <section>
            <ThemedSectionHeader title="Made For You" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {placeholderContentItems.map((item) => (
                <ContentGridCard
                  key={item.id}
                  {...item}
                  onClick={() => handleCardClick(item.type || 'unknown', item.id)}
                  onPlayClick={() => handleCardPlay(item)}
                />
              ))}
            </div>
          </section>

          <section>
            <ThemedSectionHeader title="Recently Played" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {placeholderContentItems.slice(0,5).reverse().map((item) => (
                <ContentGridCard
                  key={`recent-${item.id}`}
                  {...item}
                  title={`Recent: ${item.title}`}
                  imageUrl={`${item.imageUrl}&recent`}
                  onClick={() => handleCardClick(item.type || 'unknown', item.id)}
                  onPlayClick={() => handleCardPlay(item)}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
      <GlobalPlayerBar
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        progress={progress}
        volume={volume}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSeek={handleSeek}
        onVolumeChange={handleVolumeChange}
        onLikeToggle={handleLikeToggle}
        onQueueToggle={() => console.log('Toggle queue')}
        onFullScreenToggle={() => console.log('Toggle fullscreen player')}
      />
    </div>
  );
};

export default HomePage;