import "./styles/editabletable.css";
import { db } from "./firebase_config";
import { Select, MenuItem } from "@material-ui/core";
const EditableTable = ({ data }) => {
  const onChangeInput = (e, id) => {
    const { name, value } = e.target;
    db.collection("items")
      .doc(id)
      .update({
        [name]: value,
      });
  };

  const onDelete = (id) => {
    db.collection("items").doc(id).delete();
  };

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Date time</th>
            <th>Company</th>
            <th>Position</th>
            <th>Comment</th>
            <th>Status</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, company, position, status, timestamp, comment }) => (
            <tr key={id}>
              <td>
                <pan>{new Date(timestamp).toLocaleString()}</pan>
              </td>
              <td>
                <input
                  name="company"
                  value={company}
                  type="text"
                  onChange={(e) => onChangeInput(e, id)}
                  placeholder="Type company"
                />
              </td>
              <td>
                <input
                  name="position"
                  value={position}
                  type="text"
                  onChange={(e) => onChangeInput(e, id)}
                  placeholder="Type position"
                />
              </td>
              <td>
                <input
                  name="comment"
                  value={comment}
                  type="text"
                  onChange={(e) => onChangeInput(e, id)}
                  placeholder="Type comment"
                />
              </td>
              <td>
                <Select
                  value={status}
                  name="status"
                  onChange={(e) => onChangeInput(e, id)}
                  style={{ display: "flex", marginLeft: 10 }}
                  disableUnderline
                >
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                  <MenuItem value="Offered">Offered</MenuItem>
                </Select>
              </td>
              <td>
                <button
                  style={{ marginLeft: 10 }}
                  onClick={(e) => onDelete(id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
