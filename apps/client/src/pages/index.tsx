import { NextPage, NextPageContext } from 'next';
import { useState, useEffect } from 'react';

interface Props {
  podName: string;
}

const MyPage: NextPage<Props> = ({ podName }) => {
  const [hostname, setHostname] = useState('Loading...');

  useEffect(() => {
    const fetchHostname = async () => {
      const res = await fetch('/api/hello');
      const data = await res.json();
      setHostname(data.hostname);
    };

    fetchHostname();
  }, []);

  return (
    <div>
      <h1>CLIENT PAGE (change test)</h1>
      <h2>Hostname</h2>
      <p>{hostname}</p>
      <h2>Connected to pod:</h2>
      <p>{podName}</p>
    </div>
  );
};

MyPage.getInitialProps = async (ctx: NextPageContext) => {
  let podName: string;
  if (ctx.req && ctx.req.headers && typeof ctx.req.headers.hostname === 'string') {
    // If the request has a hostname header, use it as the pod name
    podName = ctx.req.headers.hostname;
  } else if (typeof process.env.HOSTNAME === 'string') {
    // Otherwise, use the HOSTNAME environment variable
    podName = process.env.HOSTNAME;
  } else {
    // If neither is available, use a default value
    podName = 'unknown pod';
  }
  return { podName };
};

export default MyPage;
