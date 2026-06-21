import { useEffect, useState } from "react";

function App() {
    const [message, setMessage] = useState("");

    // Make an API call to "/api/hello"
    useEffect(() => {
        fetch("/api/hello")
            .then((res) => res.json())
            .then((data) => setMessage(data.message));
    }, []);

    return <p className="font-bold p-4 text-2xl">{message}</p>;
}

export default App;
