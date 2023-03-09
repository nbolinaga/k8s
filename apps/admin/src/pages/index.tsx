export default function Home(props: { ip: any; }) {
  const ip = props.ip;
  return (
    <div style={{ width: '100vw', height: '100vh', padding: 30 }}>
      <h1>
        ADMIN PAGE
      </h1>
      <h2>
        IP Address <span style={{ color: 'blue' }}>{ip}</span>
      </h2>
    </div>
  );
}

export async function getServerSideProps(context: { req: any; }) {
  let ip;

  const { req } = context;

  if (req.headers['x-forwarded-for']) {
    ip = req.headers['x-forwarded-for'].split(',')[0];
  } else if (req.headers['x-real-ip']) {
    ip = req.connection.remoteAddress;
  } else {
    ip = req.connection.remoteAddress;
  }

  console.log(ip);
  return {
    props: {
      ip,
    },
  };
}