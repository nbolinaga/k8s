export default function handler(req, res) {
  const { headers } = req
  const hostname = headers.host
  res.status(200).json({ hostname })
}