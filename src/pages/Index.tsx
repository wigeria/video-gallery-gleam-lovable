
import { VideoGrid } from "@/components/VideoGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Video Gallery</h1>
          <p className="text-muted-foreground">
            Discover and watch amazing videos
          </p>
        </div>
        <VideoGrid />
      </div>
    </div>
  );
};

export default Index;
