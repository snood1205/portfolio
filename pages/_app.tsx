import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

interface Props {
  Component: any;
  pageProps: Record<string, unknown>;
}

const Application: React.FC<Props> = ({ Component, pageProps }: Props) => {
  return <Component {...pageProps} />;
};

export default Application;
