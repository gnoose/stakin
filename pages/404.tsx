import ErrorPage from '../components/error-page';

export default function Custom404() {
  return <ErrorPage statusCode={404} message={"Resource Not found"}/>;
}
