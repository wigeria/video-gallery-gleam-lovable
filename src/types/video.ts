
export interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  folderId?: number | null;
}

export interface Folder {
  id: number;
  name: string;
  thumbnail?: string;
}
