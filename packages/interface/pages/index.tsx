import React from "react";

const clientId = "WGwl4crnohsIPbs6CkTHP17VAM0k2oE9";
const redirectUrl = `http://localhost:3000/api/auth/redirected`;
const authLink = `https://developer.api.autodesk.com/authentication/v1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=data:read`;

function App() {
  return (
    <div>
      <section>
        <h2>Authenticate</h2>
        <a href={authLink}>Here</a>
      </section>
    </div>
  );
}

export default App;
