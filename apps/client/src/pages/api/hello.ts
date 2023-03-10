export default function handler(req: {
  connection: any; headers: any 
}, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { hostname: any }): void; new(): any } } }) {
  const { headers } = req
  const hostname = headers['x-forwarded-for'] || headers['x-real-ip'] || req.connection.remoteAddress
  
  res.status(200).json({ hostname })
  
}