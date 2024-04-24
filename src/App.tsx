import { useEffect } from "react";
import { useUser } from "./context/UserContext";
import Navigator from "./routes";

function App() {
  const { setAuthenticated, setUser, loading, setLoading } = useUser();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser") || "")
      : undefined;
    if (currentUser) {
      setAuthenticated(true);
      setUser(currentUser);
      setLoading(false);
    }
  }, []);
  if (loading) {
    <></>;
  }
  return <Navigator />;
}

export default App;
