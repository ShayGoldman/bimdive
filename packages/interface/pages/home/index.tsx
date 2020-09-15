import { useSearchParam } from "react-use";

export default function HomePage() {
  const email = useSearchParam("token");
  const error = useSearchParam("error");

  return (
    <div>
      <h1>Home Page</h1>
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
