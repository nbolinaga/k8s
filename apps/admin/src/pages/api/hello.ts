export default function handler(req: { headers: { [x: string]: any; }; connection: { remoteAddress: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { name: string; }): void; new(): any; }; }; }) {
  let ip;

  if (req.headers["x-forwarded-for"]) {
    ip = req.headers["x-forwarded-for"].split(',')[0]
  } else if (req.headers["x-real-ip"]) {
    ip = req.connection.remoteAddress
  } else {
    ip = req.connection.remoteAddress
  }

  console.log(ip);

  console.log(ip)
  res.status(200).json({ name: 'John Doe' })
}