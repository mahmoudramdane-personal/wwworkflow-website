import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/training/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim().toLowerCase(), passcode }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.ok) {
      localStorage.setItem('training_intern', JSON.stringify({
        name: data.name,
        displayName: data.displayName,
      }));
      router.push('/training');
    } else {
      setError(data.error || 'Invalid credentials');
    }
  }

  return (
    <>
      <Head><title>Training Login — Afterwork Workflow</title></Head>

      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {/* Brand header */}
          <div className="text-center mb-8">
            <h1 className="font-eb text-4xl text-black mb-2">Training</h1>
            <p className="font-alt text-gray-500">Sign in to access your tutorials</p>
          </div>

          {/* Card */}
          <form onSubmit={handleSubmit} className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 font-alt text-sm rounded-lg px-4 py-3 mb-4">
                {error}
              </div>
            )}

            <label className="block font-alt text-sm font-medium text-gray-700 mb-1.5">
              Your name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. ali"
              className="w-full font-alt border border-gray-300 rounded-lg px-4 py-2.5 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition"
              autoFocus
            />

            <label className="block font-alt text-sm font-medium text-gray-700 mb-1.5">
              Passcode
            </label>
            <input
              type="password"
              value={passcode}
              onChange={e => setPasscode(e.target.value)}
              placeholder="Your passcode"
              className="w-full font-alt border border-gray-300 rounded-lg px-4 py-2.5 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue hover:bg-blue/80 text-white font-alt font-medium py-2.5 px-4 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in →'}
            </button>
          </form>

          <p className="font-alt text-xs text-gray-400 text-center mt-6">
            Afterwork Workflow — Intern Training Portal
          </p>
        </div>
      </div>
    </>
  );
}