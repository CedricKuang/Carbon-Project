import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import config from "../../config";
import Project from "./Project";

//material UI components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

// Component declaration

const Dash = (props) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    function getProject() {
      axios
        .get(config.SERVER_URL + '/api/projects/')
        .then((res) => {
          setProjects(res.data)
        })
        .catch((err) => console.log(err));
    }
    getProject();
  }, []);

  const handleUpdateProject = () => {
    setProjects(projects.map());
  };

  return (
    <div>
      <Header>{projects.length !== 0 && <></>}</Header>
      {projects.length === 0 ? (
        <NoProjectContainer>
          {/* <h1>You haven't created any projects</h1> */}
        </NoProjectContainer>
      ) : (
        <Container>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ProjectName</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
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
      )}
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

const NoProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 20vh);
`;
export default Dash;
