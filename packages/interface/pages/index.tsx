import React from "react";

const clientId = process.env.FORGE_CLIENT_ID;
const redirectUrl = `https://app.bimdive.com/api/auth/user`;
const authLink = `https://developer.api.autodesk.com/authentication/v1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=data:read account:read`;

function App() {
  return (
    <div>
      <section>
        <h2>Authenticate</h2>
        <a href={authLink}>Here</a>
        <h2>Logout</h2>
        <a href="https://accounts.autodesk.com/Authentication/LogOut">Here</a>
      </section>
    </div>
  );
}

export default App;
