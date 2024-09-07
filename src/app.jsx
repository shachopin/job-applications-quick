import { useState, useEffect } from "react";
// Import and apply CSS stylesheet
import "./styles/app.css";
import { Button, Select, TextField, MenuItem } from "@material-ui/core";
import { db } from "./firebase_config";
import Chart from "./Chart";
import EditableTable from "./EditableTable";

function App() {
  const [items, setItems] = useState([]);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("In Progress");

  useEffect(() => {
    getItems();
  }, []); // blank to run only on first launch

  function getItems() {
    db.collection("items").onSnapshot(function (querySnapshot) {
      setItems(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          company: doc.data().company,
          position: doc.data().position,
          status: doc.data().status,
          timestamp: doc.data().timestamp,
          comment: doc.data().comment
        }))
      );
    });
  }

  function addItem(e) {
    e.preventDefault();

    db.collection("items").add({
      timestamp: Date.now(),
      company,
      position,
      status,
    });

    setCompany("");
    setPosition("");
    setStatus("In Progress");
  }

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h1>Job Applications 😃</h1>

        {items.length > 0 && <Chart data={items} />}

        <form style={{ display: "flex", flexDirection: "row", width: "90vw" }}>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ width: "30vw", marginTop: "15px" }}
          >
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
            <MenuItem value="Offered">Offered</MenuItem>
          </Select>
          <TextField
            label="Company"
            value={company}
            style={{ width: "30vw" }}
            onChange={(e) => setCompany(e.target.value)}
          />
          <TextField
            label="Position"
            value={position}
            style={{ width: "30vw" }}
            onChange={(e) => setPosition(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            onClick={addItem}
            style={{ display: "none" }}
          >
            Default
          </Button>
        </form>

        {items.length > 0 && (
          <EditableTable
            data={items.sort((left, right) => right.timestamp - left.timestamp)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
