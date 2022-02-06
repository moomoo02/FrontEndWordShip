import logo from "./logo.svg";
import "./App.css";
import RICIBs from "react-individual-character-input-boxes";
import { Button, Grid, Paper, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect, useState } from "react";
import useEventListener from "@use-it/event-listener";
import axios from "axios";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { isValid } from "ipaddr.js";

// const api = axios.create({
//   baseURL: "/",
// });

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const endpoint = "http://localhost:5000";

function App() {
  const [hotWord, setHotWord] = useState("");
  const [word, setWord] = useState("w");
  const [amount, setAmount] = useState(5);
  const [wordList, setWordList] = useState([]);

  useEffect(async () => {
    let temp = await getWord();
    setHotWord(temp);
  }, []);

  async function sendWord() {
    // const json = JSON.stringify({ event: word, data: "among us" });
    let res = await axios.post(endpoint + "/words", { input: word });
    console.log(res.data.code);
    //0 - not a word, 1 - is a duplicate, 2 - sucess
    return parseInt(res.data.code);
  }
  async function getWord() {
    let res = await axios.get(endpoint + "/words");
    console.log(res.data);
    return res.data;
  }
  //In the case of enter key being pressed
  async function handler({ key }) {
    if (key == "Enter") {
      if (word.length == 5) {
        await submit();
      }
    }
  }

  async function submit() {
    if (word.length != 5) {
      alert("Your word must be 5 letters :)");
      return;
    }

    //send word to backend and check if it is a valid word or not
    let isValid = await sendWord();

    if (isValid == 2) {
      setWordList([...wordList, word]);
      alert(word + " was sucessfully sent!");
    } else if (isValid == 1) {
      alert(word + " is a duplicate, try again :)");
    } else if (isValid == 0) {
      alert(word + " is not a valid word, try again :)");
    }

    //clear input
    setAmount(0);
    setTimeout(function () {
      setAmount(5);
    }, 50);

    //Clear word state
    setWord("");
  }
  useEventListener("keydown", handler);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="Title">Wordship!</h1>
        <div className="Word">
          <h2>Your Word:</h2>
          <p>{hotWord}</p>
        </div>
        <div className="Form">
          <RICIBs
            amount={amount}
            autoFocus={true}
            handleOutputString={(string) => {
              setWord(string);
            }}
            inputProps={
              [
                // { className: "first-box" },
                // { style: { color: "orange" } },
              ]
            }
            inputRegExp={/^[a-z]$/}
          />

          <Button
            style={{ marginTop: "40px" }}
            sx={{ size: "large" }}
            variant="contained"
            onClick={submit}
            endIcon={<SendIcon />}
          >
            Send
          </Button>
          <Button onClick={getWord}>get</Button>
        </div>
        <div className="Word-bank">
          {" "}
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 11, sm: 12, md: 12 }}
          >
            {wordList.map((_, index) => (
              <Grid item xs={1} sm={1} md={1} key={index}>
                <Item>{_}</Item>
              </Grid>
            ))}
          </Grid>
        </div>
      </header>
    </div>
  );
}

export default App;
