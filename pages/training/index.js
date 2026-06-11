import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function TrainingHome() {
  const [activeTab, setActiveTab] = useState('player');
  const [allProgress, setAllProgress] = useState(null);
  const [videos, setVideos] = useState([
    { id: '29edb8030c614590a146c60ffeaf426a', title: "Société SIYAQ AVANCEMENT DE COMPTABILTE", duration: 59.565 },
  ]);

  // Fetch progress
  async function fetchProgress() {
    try {
      const r = await fetch('/api/training/track?internId=test-intern-1&listAll=true');
      const data = await r.json();
      setAllProgress(data);
    } catch (e) {}
  }

  useEffect(() => {
    if (activeTab === 'admin') fetchProgress();
  }, [activeTab]);

  return (
    <>
      <Head><title>Training Portal</title></Head>

      <div className="min-h-screen bg-gray-900 text-white">
        <header className="bg-gray-800 px-6 py-4">
          <h1 className="text-xl font-bold">🎓 Training Portal</h1>
          <p className="text-sm text-gray-400 mt-1">Intern initiation tutorials</p>
        </header>

        {/* Tabs */}
        <div className="flex border-b border-gray-700 px-6">
          <button
            onClick={() => setActiveTab('player')}
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'player' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
          >
            ▶️ Video
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'admin' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
          >
            📊 Admin Dashboard
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-w-4xl mx-auto">
          {activeTab === 'player' && (
            <div className="space-y-4">
              <p className="text-gray-400 text-sm mb-4">Clique sur une vidéo pour commencer :</p>
              {videos.map(v => (
                <a
                  key={v.id}
                  href={`/training/video/${v.id}`}
                  className="block bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition border border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{v.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        ⏱️ {Math.round(v.duration)}s · {v.id.slice(0, 8)}...
                      </p>
                    </div>
                    <span className="text-blue-400 text-lg">▶</span>
                  </div>
                </a>
              ))}
            </div>
          )}

          {activeTab === 'admin' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">📊 Progress Dashboard</h2>
                <button
                  onClick={fetchProgress}
                  className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
                >
                  🔄 Refresh
                </button>
              </div>

              {allProgress ? (
                <div className="space-y-6">
                  {Object.entries(allProgress).map(([internId, videosData]) => {
                    const videoEntries = Object.entries(videosData);
                    const avg = videoEntries.reduce((s, [, d]) => s + (d.progress || 0), 0) / videoEntries.length || 0;
                    return (
                      <div key={internId} className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">👤 {internId}</h3>
                          <span className="text-sm font-mono text-green-400">{Math.round(avg)}% avg</span>
                        </div>
                        {videoEntries.map(([videoId, data]) => (
                          <div key={videoId} className="mt-3">
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                              <span className="truncate">{videoId.slice(0, 12)}...</span>
                              <span>{data.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all ${
                                  data.completed ? 'bg-green-500' :
                                  data.progress > 0 ? 'bg-yellow-500' : 'bg-gray-600'
                                }`}
                                style={{ width: `${data.progress}%` }}
                              />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              ⏱️ {data.currentTime}s / {data.duration}s · {data.updatedAt?.slice(0, 19)?.replace('T', ' ')}
                            </p>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                  {Object.keys(allProgress).length === 0 && (
                    <p className="text-gray-500 text-center py-8">Aucune donnée de tracking pour le moment</p>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Clique sur Refresh pour charger les données</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}