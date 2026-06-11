import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function VideoPage() {
  const router = useRouter();
  const { id } = router.query;
  const [intern, setIntern] = useState(null);
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [savedProgress, setSavedProgress] = useState(0);
  const [status, setStatus] = useState('loading');
  const lastReported = useRef(0);

  useEffect(() => {
    const raw = localStorage.getItem('training_intern');
    if (!raw) { router.replace('/training/login'); return; }
    setIntern(JSON.parse(raw));
  }, []);

  useEffect(() => {
    if (!id || !intern) return;

    fetch(`/api/training/video/${id}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) { setError(d.error); setStatus('error'); }
        else { setVideo(d); setStatus('ready'); }
      })
      .catch(() => { setError('Failed to load'); setStatus('error'); });

    fetch(`/api/training/track?internId=${intern.name}`)
      .then(r => r.json())
      .then(d => { if (d.videos?.[id]) setSavedProgress(d.videos[id].progress || 0); })
      .catch(() => {});
  }, [id, intern]);

  useEffect(() => {
    if (status !== 'ready' || !video) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.plyr.io/3.7.8/plyr.css';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.textContent = `
      .plyr { --plyr-color-main: #36C5F0; --plyr-video-background: #000; border-radius: 12px; overflow: hidden; }
      .plyr__controls { background: linear-gradient(transparent, rgba(0,0,0,0.85)) !important; }
      .plyr--video .plyr__control--overlaid { background: #36C5F0; border: none; }
      .plyr--video .plyr__control--overlaid:hover { background: #2ba8d0; }
      .plyr__progress__buffer { background: rgba(255,255,255,0.15) !important; }
    `;
    document.head.appendChild(style);

    let plyrInstance;
    import('plyr').then(({ default: Plyr }) => {
      const plyr = new Plyr('#video-player', {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
        settings: ['speed'],
        speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
      });
      plyrInstance = plyr;

      plyr.on('timeupdate', () => {
        const pct = (plyr.currentTime / plyr.duration) * 100;
        setProgress(Math.round(pct));
        if (pct - lastReported.current >= 5) {
          lastReported.current = pct;
          navigator.sendBeacon('/api/training/track', JSON.stringify({
            internId: intern.name, videoId: id,
            progress: Math.round(pct),
            currentTime: Math.round(plyr.currentTime),
            duration: Math.round(plyr.duration),
            completed: pct >= 95,
          }));
        }
      });

      plyr.on('ended', () => {
        navigator.sendBeacon('/api/training/track', JSON.stringify({
          internId: intern.name, videoId: id,
          progress: 100, currentTime: Math.round(plyr.duration),
          duration: Math.round(plyr.duration), completed: true,
        }));
      });
    });

    return () => { if (plyrInstance) plyrInstance.destroy(); };
  }, [status, video, intern]);

  return (
    <>
      <Head><title>{video?.title || 'Video'} — Training</title></Head>

      <div className="bg-black text-white px-6 py-12 md:py-14">
        <div className="max-w-4xl mx-auto">
          <Link href="/training" className="font-alt text-sm text-blue hover:text-blue/80 transition inline-flex items-center gap-1.5 mb-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
            Back
          </Link>
          <h1 className="font-eb text-3xl md:text-4xl text-white">{video?.title || 'Loading...'}</h1>
          <div className="flex items-center gap-4 mt-2">
            {video && <span className="font-alt text-sm text-cgray">{Math.round(video.duration)}s</span>}
            {intern && <span className="font-alt text-sm text-cgray">👤 {intern.displayName}</span>}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8">
        <div className="bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden">
          {status === 'loading' && (
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              <div className="font-alt text-gray-400 animate-pulse">Loading player...</div>
            </div>
          )}
          {status === 'error' && (
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              <div className="font-alt text-red-400">❌ {error}</div>
            </div>
          )}
          {status === 'ready' && video && (
            <div className="aspect-video bg-black">
              <video id="video-player" playsInline controls className="w-full h-full">
                <source src={video.streamUrl} type="video/mp4" />
              </video>
            </div>
          )}

          <div className="px-6 py-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-eb text-black text-lg">Progression</span>
                {savedProgress > 0 && (
                  <span className="font-alt text-xs bg-cgrey text-gray-500 px-2.5 py-0.5 rounded-full">
                    resumed from {savedProgress}%
                  </span>
                )}
              </div>
              <span className={`font-eb text-xl ${progress >= 95 ? 'text-green-600' : progress > 0 ? 'text-blue' : 'text-gray-400'}`}>
                {progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-500 ${progress >= 95 ? 'bg-green-500' : 'bg-blue'}`}
                style={{ width: `${Math.max(progress, savedProgress, 2)}%` }} />
            </div>
            <p className="font-alt text-sm text-gray-400 mt-2">
              {progress >= 95 ? '✅ Completed' : progress > 0 ? '▶ Watching...' : '⏸ Not started'}
            </p>
          </div>
        </div>
      </div>
      <div className="h-16" />
    </>
  );
}