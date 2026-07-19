## Install React Router

Install the package:

```bash
bun add react-router-dom
```

## Update `App.tsx`

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import ReviewPage from "./pages/ReviewPage";
import Home from "./pages/Home";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chatbot" element={<ChatPage />} />
                <Route path="/summarizer" element={<ReviewPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
```

## Create the Pages

Create a new `pages` directory and add the following files:

```text
pages/
├── ChatPage.tsx
├── Home.tsx
└── ReviewPage.tsx
```
