import fs from 'fs';
import path from 'path';

const DATA_DIR = '/tmp/training-tracker';

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function getFilePath(internId) {
  ensureDir();
  return path.join(DATA_DIR, `${internId}.json`);
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Record progress
    const { internId, videoId, progress, currentTime, duration, completed } = req.body;

    if (!internId || !videoId) {
      return res.status(400).json({ error: 'Missing internId or videoId' });
    }

    const filePath = getFilePath(internId);
    let data = {};
    if (fs.existsSync(filePath)) {
      try {
        data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      } catch (e) { /* ignore */ }
    }

    data[videoId] = {
      progress: Math.round(progress || 0),
      currentTime: Math.round(currentTime || 0),
      duration: Math.round(duration || 0),
      completed: completed || (progress >= 95),
      updatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return res.json({ ok: true, recorded: data[videoId] });
  }

  if (req.method === 'GET') {
    // Get progress for an intern
    const { internId } = req.query;
    if (!internId) {
      return res.status(400).json({ error: 'Missing internId' });
    }

    const filePath = getFilePath(internId);
    if (!fs.existsSync(filePath)) {
      return res.json({ internId, videos: {} });
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return res.json({ internId, videos: data });
  }

  if (req.method === 'DELETE') {
    // List all interns (admin dashboard)
    ensureDir();
    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
    const allData = {};
    for (const file of files) {
      const internId = file.replace('.json', '');
      allData[internId] = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf-8'));
    }
    return res.json(allData);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

// Also handle listing all progress
export async function listAll() {
  ensureDir();
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
  const allData = {};
  for (const file of files) {
    const internId = file.replace('.json', '');
    allData[internId] = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf-8'));
  }
  return allData;
}

export const config = {
  api: {
    bodyParser: true,
  },
};