import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Create from "./pages/Create";
import { createMuiTheme, Paper, ThemeProvider } from "@material-ui/core";

import { TheatersSharp } from "@material-ui/icons";
import { purple } from "@material-ui/core/colors";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";

function App() {
  const initialState = {
    notes: localStorage.getItem("notes")
      ? JSON.parse(localStorage.getItem("notes") as any)
      : [],
    dark: localStorage.getItem("dark")
      ? JSON.parse(localStorage.getItem("dark") as any)
      : false,
  };
  const [darkMode, setDarkMode] = useState(initialState.dark);
  const [notes, setNotes] = useState(initialState.notes);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: darkMode ? "#303030" : "#f7f7f7",
      },
      type: darkMode ? "dark" : "light",
      secondary: { main: "#F4BB19" },
    },
    typography: {
      fontFamily: "Quicksand",
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
    },
  });

  const setUpLocalStorage = () => {
    localStorage.setItem("notes", JSON.stringify(initialState.notes));
    setNotes(initialState.notes);
    localStorage.setItem("dark", JSON.stringify(initialState.dark));
    setDarkMode(initialState.dark);
  };

  const handleChange = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("dark", JSON.stringify(!darkMode));
  };
  useEffect(() => {
    setUpLocalStorage();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ height: "100vh" }}>
        <Router>
          <Layout handleChange={() => handleChange()} darkMode={darkMode}>
            <Switch>
              <Route exact path="/">
                <Notes />
              </Route>
              <Route path="/create">
                <Create />
              </Route>
            </Switch>
          </Layout>
        </Router>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
