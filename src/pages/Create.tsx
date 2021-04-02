import React, { useState } from "react";

import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { FormControlLabel, makeStyles } from "@material-ui/core";
import {
  Radio,
  Typography,
  Container,
  TextField,
  Button,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
  // each property inside this object is a css class
  // btn: {
  //   fontSize: 60,
  //   backgroundColor: 'violet',
  //   '&:hover': {
  //     background: 'blue',
  //   },
  // }

  field: {
    margingTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

export default function Create() {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("reminders");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (title && details) {
      fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, details, category }),
      }).then(() => history.push("/"));
    }

    setTitleError(false);
    setDetailsError(false);

    if (title == "") {
      setTitleError(true);
    }
    if (details == "") {
      setDetailsError(true);
    }
  };

  return (
    <Container>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        color="textSecondary"
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label="Note title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          label="Details"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          multiline
          rows={4}
          error={detailsError}
        />
        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="ToDos" />
            <FormControlLabel
              value="reminders"
              control={<Radio />}
              label="Reminders"
            />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>
        <Button
          // className={classes.btn}
          type="submit"
          variant="contained"
          color="secondary"
          // startIcon={<SendIcon />}
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>

      <br />
    </Container>
  );
}
