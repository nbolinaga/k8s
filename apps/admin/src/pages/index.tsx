import { useState, useEffect } from 'react'

export default function Hostname() {
  const [hostname, setHostname] = useState('Loading...')

  useEffect(() => {
    const fetchHostname = async () => {
      const res = await fetch('/api/hello')
      const data = await res.json()
      setHostname(data.hostname)
    }

    fetchHostname()
  }, [])

  return (
    <div>
      <h1> ADMIN PAGE </h1>
      <h2>Hostname</h2>
      <p>{hostname}</p>
    </div>
  )
}