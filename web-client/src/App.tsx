import { AppDataProvider } from "./providers/appDataProvider";

import Navigator from "./components/Navigator";

function App() {
    return (
        <AppDataProvider>
            <Navigator />
        </AppDataProvider>
    );
}

export default App;
