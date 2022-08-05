import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { mediaQueries } from "../../shared/config";
import config from "../../config";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";

//material UI components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

/**
 * Component Declaration
 */
function Project(props) {
  const history = useHistory();
  const { data } = props;

  const handleDenyProjects = (id) => {
    axios
      .post(config.SERVER_URL + `/api/admin/deny`, {
        id: id,
      })
      .then((res) => {
        alert(res.data);
        window.location.reload();
      })
      .catch((err) => alert(err.message));
  };

  const handleApproveProjects = (id) => {
    axios
      .post(config.SERVER_URL + `/api/admin/approve`, {
        id: id,
      })
      .then((res) => {
        alert(res.data);
        window.location.reload();
      })
      .catch((err) => alert(err.message));
  };

  const handleRequestProjectChange = (id) => {
    axios
      .post(config.SERVER_URL + `/api/admin/changesRequested`, {
        id: id,
      })
      .then((res) => {
        alert(res.data);
        window.location.reload();
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <TableRow>
        <TableCell>{data.name}</TableCell>
        <TableCell>{data.status}</TableCell>
        <TableCell>
          <Button
            size="small"
            variant="outlined"
            onClick={() => history.push(`/edit/${data["_id"]}`)}
          >
            View
          </Button>
        </TableCell>
        <TableCell>
          <Button
            size="small"
            variant="outlined"
            color="warning"
            onClick={() => handleRequestProjectChange(data["_id"])}
          >
            Request Change
          </Button>
        </TableCell>
        <TableCell>
          {data.isApproved ? (
            <Button size="small" color="success" variant="outlined" disabled>
              Approve
            </Button>
          ) : (
            <Button
              size="small"
              color="success"
              variant="outlined"
              onClick={() => handleApproveProjects(data["_id"])}
            >
              Approve
            </Button>
          )}
        </TableCell>
        <TableCell>
          {data.status == "denied" ? (
            <Button size="small" color="error" variant="outlined" disabled>
              Deny
            </Button>
          ) : (
            <Button
              size="small"
              color="error"
              variant="outlined"
              onClick={() => handleDenyProjects(data["_id"])}
            >
              Deny
            </Button>
          )}
        </TableCell>
      </TableRow>
    </>
  );
}

// Component declaration

const AdminProjects = (props) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    function getProject() {
      axios
        .get(config.SERVER_URL + "/api/admin/projects/")
        .then((res) => setProjects(res.data.allProjects.reverse()))
        .catch((err) => console.log(err));
    }
    getProject();
  }, []);

  const handleUpdateProject = () => {
    console.log(projects);
    setProjects([...projects]);
  };

  return (
    <div>
      {
        <Container>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ProjectName</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>View</TableCell>
                  <TableCell>Request Changes</TableCell>
                  <TableCell>Approve</TableCell>
                  <TableCell>Deny</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((project, index) => {
                  return (
                    <Project
                      key={index}
                      data={project}
                      handleUpdateProject={handleUpdateProject}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      }
    </div>
  );
};

// styled components declaration

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Buttons = styled.button`
  background-color: white;
  color: black;
  padding: 2em;
  cursor: pointer;
`;

const Container = styled.div`
  ${
    "" /* background: #444444;
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 2em 0;
  row-gap: 2em;
  min-height: 80vh;
  ${mediaQueries.mobile} {
    grid-template-columns: 100%; */
  }
  }
`;
export default AdminProjects;
