
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
import { useQuery } from "@tanstack/react-query";

const ITEMS_PER_PAGE = 6;

async function fetchFilesAndFolders(path: string) {
  const response = await fetch(`/api/files?path=${encodeURIComponent(path)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch files and folders');
  }
  return response.json();
}

export const VideoGrid = () => {
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const basePath = import.meta.env.VITE_MEDIA_PATH || '/media/recordings';
  const currentPath = currentFolder || basePath;

  const { data, isLoading, error } = useQuery({
    queryKey: ['files', currentPath],
    queryFn: () => fetchFilesAndFolders(currentPath),
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading files: {error.message}
      </div>
    );
  }

  const { folders = [], videos = [] } = data || {};
  const items = currentFolder === null ? folders : videos;
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
          ? paginatedItems.map((folder: Folder) => (
              <FolderCard
                key={folder.id}
                folder={folder}
                onClick={() => {
                  setCurrentFolder(folder.path);
                  setCurrentPage(1);
                }}
              />
            ))
          : paginatedItems.map((video: Video) => (
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
