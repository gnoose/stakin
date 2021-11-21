import Error404 from './404';

interface Props {
  statusCode: number;
  message: string;
}

export default function ErrorPage({statusCode, message}: Props) {
  if (statusCode === 404) {
    return <Error404/>;
  }
  return (<section className="w-screen h-screen bg-primary">
    <div className="container mx-auto text-white">
      <div className="text-32">Code: {statusCode}</div>
      <div className="text-22">Message: {message}</div>
    </div>
  </section>);
}

ErrorPage.defaultProps = {
  statusCode: 500,
  message: 'Internal Server Error',
}
