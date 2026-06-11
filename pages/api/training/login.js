export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST only' });
  }

  const { name, passcode } = req.body;
  if (!name || !passcode) {
    return res.status(400).json({ error: 'Name and passcode required' });
  }

  // Intern credentials from env var (JSON string)
  // Format: {"ali":"abc123","sara":"xyz789"}
  const internsRaw = process.env.TRAINING_INTERNS || '{}';
  let interns;
  try {
    interns = JSON.parse(internsRaw);
  } catch {
    return res.status(500).json({ error: 'Server config error' });
  }

  const cleanName = name.trim().toLowerCase();

  if (!interns[cleanName]) {
    return res.status(401).json({ error: 'Intern not found' });
  }

  if (interns[cleanName] !== passcode.trim()) {
    return res.status(401).json({ error: 'Wrong passcode' });
  }

  // Capitalize name for display
  const displayName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

  return res.status(200).json({
    ok: true,
    name: cleanName,
    displayName,
  });
}

export const config = {
  api: { bodyParser: true },
};