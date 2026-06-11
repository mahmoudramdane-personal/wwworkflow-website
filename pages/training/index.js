import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function TrainingHome() {
  const [activeTab, setActiveTab] = useState('player');
  const [allProgress, setAllProgress] = useState(null);

  const videos = [
    { id: '29edb8030c614590a146c60ffeaf426a', title: "Société SIYAQ — Avancement de comptabilité", duration: 59.565, desc: "Initiation au suivi comptable" },
  ];

  async function fetchProgress() {
    try {
      const r = await fetch('/api/training/track?internId=test-intern-1&listAll=true');
      setAllProgress(await r.json());
    } catch (e) {}
  }

  useEffect(() => {
    if (activeTab === 'admin') fetchProgress();
  }, [activeTab]);

  return (
    <>
      <Head><title>Training — Afterwork Workflow</title></Head>

      {/* Hero header */}
      <div className="bg-black text-white px-6 py-16 md:py-20 text-center">
        <h1 className="font-eb text-4xl md:text-5xl text-white mb-3">🎓 Training</h1>
        <p className="font-alt text-cgray max-w-md mx-auto text-lg">
          Initiation tutorials for interns
        </p>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-0">
        <div className="flex gap-1 bg-cgrey border-b border-gray-300 pt-6">
          <button
            onClick={() => setActiveTab('player')}
            className={`px-5 py-3 text-sm font-alt font-medium rounded-t-lg transition ${
              activeTab === 'player'
                ? 'bg-white text-black border-t border-l border-r border-gray-300 -mb-px'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            ▶ Videos
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-5 py-3 text-sm font-alt font-medium rounded-t-lg transition ${
              activeTab === 'admin'
                ? 'bg-white text-black border-t border-l border-r border-gray-300 -mb-px'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            📊 Dashboard
          </button>
        </div>

        {/* Content */}
        <div className="bg-white border border-t-0 border-gray-300 rounded-b-lg px-6 py-8">
          {activeTab === 'player' && (
            <div>
              <p className="font-alt text-gray-500 mb-6 text-sm">
                Select a video to start watching:
              </p>
              <div className="space-y-3">
                {videos.map((v, i) => (
                  <a
                    key={v.id}
                    href={`/training/video/${v.id}`}
                    className="flex items-center gap-4 bg-cgrey hover:bg-gray-200 transition rounded-lg p-4 group"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue text-white flex items-center justify-center text-sm font-ibm">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-eb text-lg text-black truncate">{v.title}</h3>
                      <p className="font-alt text-sm text-gray-500">{v.desc}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-ibm text-xs text-gray-400">{Math.round(v.duration)}s</span>
                      <span className="w-9 h-9 rounded-full bg-blue text-white flex items-center justify-center group-hover:bg-blue/80 transition">
                        <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'admin' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-eb text-2xl text-black">Progress Dashboard</h2>
                <button
                  onClick={fetchProgress}
                  className="font-alt text-sm bg-blue hover:bg-blue/80 text-white px-4 py-2 rounded-lg transition"
                >
                  ↻ Refresh
                </button>
              </div>

              {allProgress && Object.keys(allProgress).length > 0 ? (
                <div className="space-y-6">
                  {Object.entries(allProgress).map(([internId, videosData]) => {
                    const entries = Object.entries(videosData);
                    const avg = Math.round(entries.reduce((s, [, d]) => s + (d.progress || 0), 0) / entries.length);
                    return (
                      <div key={internId} className="bg-cgrey rounded-lg p-5 border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue text-white flex items-center justify-center font-ibm text-sm">
                              {internId.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="font-eb text-lg text-black">{internId}</h3>
                              <p className="font-alt text-xs text-gray-500">{entries.length} video{entries.length > 1 ? 's' : ''}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-eb text-2xl text-green-600">{avg}%</div>
                            <p className="font-alt text-xs text-gray-500">avg progress</p>
                          </div>
                        </div>
                        {entries.map(([videoId, data]) => (
                          <div key={videoId} className="mb-3 last:mb-0">
                            <div className="flex justify-between font-alt text-sm mb-1.5">
                              <span className="text-black font-medium truncate">{videoId.slice(0, 16)}...</span>
                              <span className="text-gray-500 ml-2 flex-shrink-0">{data.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  data.completed ? 'bg-green-500' : data.progress > 0 ? 'bg-blue' : 'bg-gray-300'
                                }`}
                                style={{ width: `${Math.max(data.progress, 2)}%` }}
                              />
                            </div>
                            {data.updatedAt && (
                              <p className="font-ibm text-xs text-gray-400 mt-1">
                                {data.currentTime}s / {data.duration}s · {data.updatedAt.slice(0, 10)}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="font-eb text-xl text-gray-400 mb-2">No tracking data yet</p>
                  <p className="font-alt text-sm text-gray-400">Watch a video first, then check back here.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Spacer */}
      <div className="h-12" />
    </>
  );
}