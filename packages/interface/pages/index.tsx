import React from "react";

const clientId = "WGwl4crnohsIPbs6CkTHP17VAM0k2oE9";
const redirectUrl = `https://ft92wl46ie.execute-api.eu-west-2.amazonaws.com/prod/auth/user`;
const authLink = `https://developer.api.autodesk.com/authentication/v1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=data:read`;

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
