import { useEffect, useState } from 'react';
import { Button } from './components/ui/button';

function App() {
    const [message, setMessage] = useState('');

    // Make an API call to "/api/hello"
    useEffect(() => {
        fetch('/api/hello')
            .then((res) => res.json())
            .then((data) => setMessage(data.message));
    }, []);

    return (
        <div>
            <p className="font-bold p-4 text-2xl">{message}</p>
            <Button className="ml-4">Click me!</Button>
        </div>
    );
}

export default App;
