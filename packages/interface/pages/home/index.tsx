import axios from "axios";
import { useSearchParam, useAsync } from "react-use";

export default function HomePage() {
  const email = useSearchParam("emailz");
  const error = useSearchParam("error");
  const { loading, value } = useAsync(
    () =>
      axios.post(
        "http://ft92wl46ie.execute-api.eu-west-2.amazonaws.com/prod/metabase/embed",
        { questionId: 17 }
      ),
    []
  );

  return (
    <div>
      <h1>Home Page</h1>
      {value && value.url && (
        <iframe
          src={value.url}
          allowTransparency
          frameBorder="0"
          width="800"
          height="600"
        />
      )}
      {value && <pre>{value}</pre>}
      {email && <h2>Henlo {email}</h2>}
      {error && (
        <section>
          <h2>Error</h2>
          <pre>{error}</pre>
        </section>
      )}
    </div>
  );
}
