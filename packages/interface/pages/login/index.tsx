import React from 'react';

const clientId = process.env.NEXT_PUBLIC_FORGE_CLIENT_ID;

const redirectUrl = `https://app.bimdive.com/api/auth/user`;
const authLink = `https://developer.api.autodesk.com/authentication/v1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=data:read account:read`;

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
