import React from "react";
import axios from "axios";
import config from "../../config";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { withStyles } from "@material-ui/core/styles";

const MyTableCell = withStyles((theme) => ({
  root: {
    backgroundColor: "white",
  },
}))(TableCell);

export function UserProfile() {
  const [username, setUsername] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [group, setGroup] = React.useState(""); //TODO: dynamically set group when backend api is ready

  React.useEffect(() => {
    axios
      .get(config.SERVER_URL + `/api/user/get_current_user`)
      .then((res) => {
        setUsername(res.data.user.email);
        setUserId(res.data.user._id);
      })
      .catch((error) => console.log(error));
    axios
      .get(config.SERVER_URL + `/api/user/` + userId)
      .then((res) => {
        let sec = res.data.section;
        setGroup(sec == null ? "None Listed" : sec);
      })
      .catch((error) => {
        console.log(error);
        setGroup("Error Calling API");
      });
  }, []);

  return (
    <Table>
      <TableBody>
        <TableRow>
          <MyTableCell variant="head">User Email: </MyTableCell>
          <TableCell>{username}</TableCell>
        </TableRow>
        <TableRow>
          <MyTableCell variant="head">Section:</MyTableCell>
          <TableCell>{group}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
