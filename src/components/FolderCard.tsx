
import { Folder } from "@/types/video";
import { Folder as FolderIcon } from "lucide-react";

interface FolderCardProps {
  folder: Folder;
  onClick: () => void;
}

export const FolderCard = ({ folder, onClick }: FolderCardProps) => {
  return (
    <div
      onClick={onClick}
      className="relative overflow-hidden rounded-lg cursor-pointer video-card-hover"
    >
      <div className="relative aspect-video">
        {folder.thumbnail ? (
          <img
            src={folder.thumbnail}
            alt={folder.name}
            className="object-cover w-full h-full brightness-50"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <FolderIcon className="w-16 h-16 text-muted-foreground" />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/40 p-4 rounded-lg backdrop-blur-sm">
            <FolderIcon className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
      <div className="p-4 bg-white/80 backdrop-blur-sm">
        <h3 className="font-medium text-sm truncate">{folder.name}</h3>
      </div>
    </div>
  );
};
