
export interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  folderId?: number | null;
  path: string;
}

export interface Folder {
  id: number;
  name: string;
  thumbnail?: string;
  path: string;
}

export interface FileSystemError {
  message: string;
}
