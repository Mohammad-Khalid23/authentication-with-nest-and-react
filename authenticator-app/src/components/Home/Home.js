import { useState } from 'react';

export default function Home() {
    const [credentials, setCredentials] = useState({});

    return (
        <div>
        <header>
          <h1>Authenticator App</h1>
        </header>
        <main>
          <p>Welcome to Authenticator App</p>
          
        </main>
      </div>
    )
}