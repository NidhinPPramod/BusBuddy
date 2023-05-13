import "./App.css";
import AppRouter from "./components/AppRouter/AppRouter";
import AuthContextProvider from "./Contexts/AuthContext";
import DriverContextProvider from "./Contexts/DriverContext";
import UserContextProvider from "./Contexts/UserContext";

function App() {
  return (
    <AuthContextProvider>
      <DriverContextProvider>
        <UserContextProvider>
          <AppRouter />
        </UserContextProvider>
      </DriverContextProvider>
    </AuthContextProvider>
  );
}

export default App;
