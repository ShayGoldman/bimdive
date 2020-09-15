import { useSearchParam } from "react-use";

export default function HomePage() {
  const token = useSearchParam("token");
  const error = useSearchParam("error");

  return (
    <div>
      <h1>Home Page</h1>
      {token && (
        <section>
          <h2>Token</h2>
          <pre>{token}</pre>
        </section>
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
