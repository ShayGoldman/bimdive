import axios from "axios";
import { useSearchParam, useAsync } from "react-use";

export default function HomePage() {
  const email = useSearchParam("emailz");
  const error = useSearchParam("error");
  const { loading, value } = useAsync(async () => {
    const {
      data,
    } = await axios.post(
      "https://ft92wl46ie.execute-api.eu-west-2.amazonaws.com/prod/metabase/embed",
      { questionId: 17 }
    );
    return data;
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      {value?.data?.url && (
        <iframe
          src={value.data.url}
          allowTransparency
          frameBorder="0"
          width="800"
          height="600"
        />
      )}
      {error && (
        <section>
          <h2>Error</h2>
          <pre>{error}</pre>
        </section>
      )}
    </div>
  );
}
