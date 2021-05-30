import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Create from "./pages/Create";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import { TheatersSharp } from "@material-ui/icons";
import { purple } from "@material-ui/core/colors";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fefefe",
    },
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

function App() {
  const initialState = {
    notes: localStorage.getItem("notes")
      ? JSON.parse(localStorage.getItem("notes") as any)
      : [],
  };
  const [notes, setNotes] = useState(initialState.notes);
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(initialState.notes));
    setNotes(initialState.notes);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
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
    </ThemeProvider>
  );
}

export default App;
