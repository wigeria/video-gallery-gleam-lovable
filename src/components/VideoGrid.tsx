
import { VideoCard } from "./VideoCard";

const DEMO_VIDEOS = [
  {
    id: 1,
    title: "Beautiful Sunset Time-lapse",
    thumbnail: "https://images.unsplash.com/photo-1572800579830-fd2e0f2b5892",
    duration: "3:45"
  },
  {
    id: 2,
    title: "Mountain Adventure",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    duration: "5:20"
  },
  {
    id: 3,
    title: "Ocean Waves",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    duration: "2:15"
  },
  {
    id: 4,
    title: "City Life",
    thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
    duration: "4:10"
  },
  {
    id: 5,
    title: "Forest Morning",
    thumbnail: "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21",
    duration: "3:30"
  },
  {
    id: 6,
    title: "Desert Adventure",
    thumbnail: "https://images.unsplash.com/photo-1509316785289-025f5b846b35",
    duration: "6:15"
  }
];

export const VideoGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {DEMO_VIDEOS.map((video) => (
        <VideoCard
          key={video.id}
          title={video.title}
          thumbnail={video.thumbnail}
          duration={video.duration}
        />
      ))}
    </div>
  );
};
