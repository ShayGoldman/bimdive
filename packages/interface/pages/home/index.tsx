import axios from "axios";
import { useCallback } from "react";
import { useAsync } from "react-use";

const apiUrl = `https://ip32mnh28g.execute-api.eu-west-2.amazonaws.com/prod`;

const Spinner = () => (
  <img src="https://i.imgflip.com/4hkjrq.jpg" width="200" />
);

const Error = () => <img src="https://i.imgflip.com/4hkjzg.jpg" width="200" />;

const Demo1 = () => {
  const { loading, value, error } = useAsync(async () => {
    const { data } = await axios.post(apiUrl + "/metabase/embed", {
      questionId: 17,
    });
    return data;
  }, []);

  return (
    <div>
      {loading && <Spinner />}
      {!loading && error && <Error />}
      {!loading && !error && value?.data?.url && (
        <iframe src={value.data.url} frameBorder="0" width="400" height="400" />
      )}
    </div>
  );
};

const Demo2 = () => {
  const { loading, value, error } = useAsync(async () => {
    const { data } = await axios.post(apiUrl + "/metabase/embed", {
      questionId: 19,
    });
    return data;
  }, []);

  return (
    <div>
      {loading && <Spinner />}
      {!loading && error && <Error />}
      {!loading && !error && value?.data?.url && (
        <iframe src={value.data.url} frameBorder="0" width="400" height="400" />
      )}
    </div>
  );
};

const ScanButton = ({ email }) => {
  const scan = useCallback(async () => {
    if (email) {
      await axios.post(apiUrl + "/scan", { email });
    }
  }, [email]);

  return (
    <button
      style={{ cursor: email ? "pointer" : "not-allowed" }}
      disabled={!email}
      onClick={scan}
    >
      Scan
    </button>
  );
};

export default function HomePage({ query }) {
  const { email = "" } = query;
  return (
    <div>
      <h1>Henlo {email}</h1>
      <h2>Clickies</h2>
      <ScanButton email={email} />
      <h2>Demoes</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Demo1 />
        <Demo2 />
      </div>
    </div>
  );
}

HomePage.getInitialProps = ({ query }) => {
  return { query };
};
