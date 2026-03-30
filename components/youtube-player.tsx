function getYoutubeEmbedUrl(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^?&/]+)/,
    /youtube\.com\/embed\/([^?&/]+)/,
    /youtube\.com\/shorts\/([^?&/]+)/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }

  return null;
}

interface YoutubePlayerProps {
  url: string;
  title?: string;
}

export function YoutubePlayer({ url, title }: YoutubePlayerProps) {
  const embedUrl = getYoutubeEmbedUrl(url);

  if (!embedUrl) {
    return (
      <div className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
        YouTube link is invalid.
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-muted">
      <iframe
        src={embedUrl}
        title={title || "YouTube Video Player"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
