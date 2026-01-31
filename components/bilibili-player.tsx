interface BilibiliPlayerProps {
    bvid: string;
    title?: string;
}

export function BilibiliPlayer({ bvid, title }: BilibiliPlayerProps) {
    return (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
            <iframe
                src={`//player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmaku=0`}
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="absolute inset-0 w-full h-full border-0"
                title={title || "Bilibili Video Player"}
            />
        </div>
    );
}
