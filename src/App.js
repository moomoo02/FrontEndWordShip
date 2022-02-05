import logo from "./logo.svg";
import "./App.css";
import RICIBs from "react-individual-character-input-boxes";
import { Button, Grid, Paper, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import React, { useState } from "react";
import useEventListener from "@use-it/event-listener";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function App() {
  const [word, setWord] = useState("w");
  const [amount, setAmount] = useState(5);

  function handler({ key }) {
    if (key == "Enter") {
      if (word.length == 5) {
        setAmount(0);
        setTimeout(function () {
          setAmount(5);
          // Something you want delayed.
        }, 50); // How long you want the delay to be, measured in milliseconds.
        alert(word);
      }
    }
  }

  useEventListener("keydown", handler);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="Title">Wordship!</h1>
        <div className="Word">
          <h2>Your Word:</h2>
          <p>Sussy</p>
        </div>
        <div className="Form">
          <RICIBs
            amount={amount}
            autoFocus={true}
            handleOutputString={(string) => {
              setWord(string);
            }}
            inputProps={[
              { className: "first-box" },
              { style: { color: "orange" } },
            ]}
            inputRegExp={/^[a-z]$/}
          />

          <Button
            style={{ marginTop: "40px" }}
            sx={{ size: "large" }}
            variant="contained"
            onClick={() => {
              if (word.length != 5) {
                alert("Your word must be 5 letters :)");
                return;
              }
              setAmount(0);
              setTimeout(function () {
                setAmount(5);
                // Something you want delayed.
              }, 50); // How long you want the delay to be, measured in milliseconds.
              alert(word);
            }}
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </div>
        {/* <div className="Word-bank">
          {" "}
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {Array.from(Array(50)).map((_, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <Item>xs=2</Item>
              </Grid>
            ))}
          </Grid>
        </div> */}
      </header>
    </div>
  );
}

export default App;
