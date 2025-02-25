
import { Play } from "lucide-react";
import { useState } from "react";

interface VideoCardProps {
  title: string;
  thumbnail: string;
  duration: string;
}

export const VideoCard = ({ title, thumbnail, duration }: VideoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-lg video-card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video">
        <img
          src={thumbnail}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300"
          loading="lazy"
        />
        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Play className="w-12 h-12 text-white" />
        </div>
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-xs text-white">
          {duration}
        </div>
      </div>
      <div className="p-4 bg-white/80 backdrop-blur-sm">
        <h3 className="font-medium text-sm truncate">{title}</h3>
      </div>
    </div>
  );
};
