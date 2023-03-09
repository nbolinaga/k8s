export default function handler(req: { headers: any }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { hostname: any }): void; new(): any } } }) {
  const { headers } = req
  const hostname = headers.host
  res.status(200).json({ hostname })
}