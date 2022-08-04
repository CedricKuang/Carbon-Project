import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Modal from "react-modal";
import { mediaQueries } from "../../shared/config";
import config from "../../config";
import { projectStatuses } from "../../shared/ProjectConfig";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import axios from "axios";

//material UI components
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

/**
 * Component Declaration
 */
export default function Project(props) {
  const [deleteProjectModalOpen, setDeleteProjectModalOpen] = useState(false);
  const history = useHistory();

  const modalCustomStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const { data } = props;

  const handleDeleteProject = (id) => {
    axios
      .delete(config.SERVER_URL + `/api/projects/${id}`)
      .then((res) => {
        alert(res.data);
        window.location.reload();
        setDeleteProjectModalOpen(false);
      })
      .catch((err) => alert(err.message));
  };

  const projectStatusChoice = Object.entries(projectStatuses).map(
    ([key, value]) => (
      <MenuItem key={key} value={value}>
        {value}
      </MenuItem>
    )
  );

  const handleChangeStatus = (event) => {
    let selectedStatus = event.target.value;
    let currentStatus = data.status;
    console.log(selectedStatus + " clicked");

    // only update status when selecting a different one than current
    if (selectedStatus != currentStatus) {
      let backendApi;
      switch (selectedStatus) {
        case projectStatuses.draft:
          backendApi = "draft";
          break;
        case projectStatuses.readyToView:
          backendApi = "readyToView";
          break;
      }
      axios
        .post(config.SERVER_URL + `/api/projects/${backendApi}`, {
          id: data._id,
        })
        .then((res) => {
          alert(res.data.message);
          window.location.reload();
        })
        .catch((err) => alert(err.message));
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>{data.name}</TableCell>
        <TableCell>
          {data.status === "Approved" ||
          data.status === "Denied" ||
          data.status === "Changes Requested" ? (
            <div>{data.status}</div>
          ) : (
            <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={data.status}
                onChange={handleChangeStatus}
                inputProps={{ "aria-label": "Without label" }}
              >
                {projectStatusChoice}
              </Select>
            </FormControl>
          )}
        </TableCell>
        <TableCell>
          <Button
            size="small"
            variant="outlined"
            onClick={() => history.push(`/edit/${data["_id"]}`)}
            disabled={
              data.status === "Approved" || data.status === "Denied"
                ? true
                : false
            }
          >
            Edit
          </Button>
        </TableCell>
        <TableCell>
          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={() => setDeleteProjectModalOpen(true)}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <Modal
        isOpen={deleteProjectModalOpen}
        onRequestClose={() => setDeleteProjectModalOpen(false)}
        ariaHideApp={false}
        style={modalCustomStyles}
      >
        <p>Are you sure you want to delete this project?</p>
        <Buttons onClick={() => handleDeleteProject(data["_id"])}>
          Delete
        </Buttons>
        <Buttons onClick={() => setDeleteProjectModalOpen(false)}>
          Cancel
        </Buttons>
      </Modal>
    </>
  );
}

/**
 * Styled components declaration
 */
const Buttons = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 0.2rem;
  width: 6em;
  background: white;
  color: black;
  border: 2px solid lightblue;
`;
