import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const INTERN_ID = 'test-intern-1'; // Will add login later

export default function VideoTest() {
  const router = useRouter();
  const { id } = router.query;
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [savedProgress, setSavedProgress] = useState(0);
  const [status, setStatus] = useState('loading');
  const playerRef = useRef(null);
  const plyrRef = useRef(null);
  const lastReported = useRef(0);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/training/video/${id}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
          setStatus('error');
        } else {
          setVideo(data);
          setStatus('ready');
        }
      })
      .catch(() => { setError('Failed to load video'); setStatus('error'); });

    // Load saved progress
    fetch(`/api/training/track?internId=${INTERN_ID}`)
      .then(r => r.json())
      .then(data => {
        if (data.videos && data.videos[id]) {
          setSavedProgress(data.videos[id].progress || 0);
        }
      })
      .catch(() => {});
  }, [id]);

  useEffect(() => {
    if (status !== 'ready' || !video) return;

    let plyr;

    async function initPlayer() {
      // Load Plyr CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.plyr.io/3.7.8/plyr.css';
      document.head.appendChild(link);

      // Load Plyr JS
      const Plyr = (await import('plyr')).default;

      const player = new Plyr('#video-player', {
        controls: ['play-large', 'play', 'progress', 'current-time', 'duration',
                   'mute', 'volume', 'captions', 'settings', 'pip', 'fullscreen'],
        settings: ['captions', 'quality', 'speed'],
        speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
      });

      plyrRef.current = player;
      playerRef.current = document.querySelector('#video-player');

      // Track timeupdate
      player.on('timeupdate', () => {
        const pct = (player.currentTime / player.duration) * 100;
        setProgress(Math.round(pct));

        // Report every 5%
        if (pct - lastReported.current >= 5) {
          lastReported.current = pct;
          reportProgress({
            internId: INTERN_ID,
            videoId: id,
            progress: Math.round(pct),
            currentTime: Math.round(player.currentTime),
            duration: Math.round(player.duration),
            completed: pct >= 95,
          });
        }
      });

      // Report on pause/end
      player.on('pause', () => {
        if (player.currentTime > 0) {
          reportProgress({
            internId: INTERN_ID,
            videoId: id,
            progress: Math.round((player.currentTime / player.duration) * 100),
            currentTime: Math.round(player.currentTime),
            duration: Math.round(player.duration),
          });
        }
      });

      player.on('ended', () => {
        reportProgress({
          internId: INTERN_ID,
          videoId: id,
          progress: 100,
          currentTime: Math.round(player.duration),
          duration: Math.round(player.duration),
          completed: true,
        });
      });
    }

    initPlayer();

    return () => {
      if (plyrRef.current) plyrRef.current.destroy();
    };
  }, [status, video, id]);

  function reportProgress(data) {
    navigator.sendBeacon('/api/training/track', JSON.stringify(data));
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">⏳ Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">❌ {error}</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Training - {video?.title || 'Video'}</title>
      </Head>

      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <header className="bg-gray-800 px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold truncate">{video?.title}</h1>
          <a href="/training" className="text-blue-400 hover:text-blue-300 text-sm">
            ← Retour
          </a>
        </header>

        {/* Video Player */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="rounded-lg overflow-hidden bg-black">
            <video
              id="video-player"
              playsInline
              controls
              data-poster="/api/placeholder"
            >
              <source src={video?.streamUrl} type="video/mp4" />
            </video>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Progression</span>
              <span className="text-sm font-mono text-blue-400">{progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${Math.max(progress, savedProgress)}%` }}
              />
            </div>
            {savedProgress > 0 && (
              <p className="text-xs text-gray-500 mt-2">
                📌 Précédemment: {savedProgress}% — tu peux reprendre où tu t'es arrêté
              </p>
            )}
          </div>

          {/* Video Info */}
          <div className="mt-4 text-sm text-gray-400">
            <p>📹 ID: {video?.id}</p>
            <p>⏱️ Durée: {video?.duration ? `${Math.round(video.duration)}s` : '—'}</p>
            <p>👤 Intern: {INTERN_ID}</p>
          </div>
        </div>
      </div>
    </>
  );
}