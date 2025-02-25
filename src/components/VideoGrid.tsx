
import { useState } from "react";
import { VideoCard } from "./VideoCard";
import { FolderCard } from "./FolderCard";
import { Folder, Video } from "@/types/video";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeft } from "lucide-react";

const ITEMS_PER_PAGE = 6;

const DEMO_FOLDERS: Folder[] = [
  {
    id: 1,
    name: "Nature",
    thumbnail: "https://images.unsplash.com/photo-1572800579830-fd2e0f2b5892",
  },
  {
    id: 2,
    name: "Cities",
    thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
  },
];

const DEMO_VIDEOS: Video[] = [
  {
    id: 1,
    title: "Beautiful Sunset Time-lapse",
    thumbnail: "https://images.unsplash.com/photo-1572800579830-fd2e0f2b5892",
    duration: "3:45",
    folderId: 1,
  },
  {
    id: 2,
    title: "Mountain Adventure",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    duration: "5:20",
    folderId: 1,
  },
  {
    id: 3,
    title: "Ocean Waves",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    duration: "2:15",
    folderId: 1,
  },
  {
    id: 4,
    title: "City Life",
    thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
    duration: "4:10",
    folderId: 2,
  },
  {
    id: 5,
    title: "Forest Morning",
    thumbnail: "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21",
    duration: "3:30",
    folderId: 1,
  },
  {
    id: 6,
    title: "Desert Adventure",
    thumbnail: "https://images.unsplash.com/photo-1509316785289-025f5b846b35",
    duration: "6:15",
    folderId: null,
  },
  {
    id: 7,
    title: "Night City",
    thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
    duration: "3:20",
    folderId: 2,
  },
];

export const VideoGrid = () => {
  const [currentFolder, setCurrentFolder] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredVideos = DEMO_VIDEOS.filter(
    (video) => video.folderId === currentFolder
  );
  const items = currentFolder === null ? DEMO_FOLDERS : filteredVideos;
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      {currentFolder !== null && (
        <button
          onClick={() => {
            setCurrentFolder(null);
            setCurrentPage(1);
          }}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to folders
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentFolder === null
          ? paginatedItems.map((folder) => (
              <FolderCard
                key={folder.id}
                folder={folder as Folder}
                onClick={() => {
                  setCurrentFolder(folder.id);
                  setCurrentPage(1);
                }}
              />
            ))
          : paginatedItems.map((video) => (
              <VideoCard
                key={video.id}
                title={video.title}
                thumbnail={video.thumbnail}
                duration={video.duration}
              />
            ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((p) => Math.max(1, p - 1));
                }}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
