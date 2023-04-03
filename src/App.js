import "./App.css";
import AppRouter from "./components/AppRouter/AppRouter";
import AuthContextProvider from "./Contexts/AuthContext";
import UserContextProvider from "./Contexts/UserContext";

function App() {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <AppRouter />
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;
