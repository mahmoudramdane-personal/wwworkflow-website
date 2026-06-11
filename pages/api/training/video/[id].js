import { R2 } from '../../../../lib/r2';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  const videos = {
    '29edb8030c614590a146c60ffeaf426a': {
      id: '29edb8030c614590a146c60ffeaf426a',
      title: "Société SIYAQ AVANCEMENT DE COMPTABILTE",
      duration: 59.565,
      bucket: 'training-videos',
      key: 'videos/29edb8030c614590a146c60ffeaf426a.mp4',
    }
  };

  const video = videos[id];
  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }

  // Generate presigned URL
  const url = await R2.getPresignedUrl(video.bucket, video.key);

  res.json({
    ...video,
    streamUrl: url,
  });
}