import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import CreateSection from "./Sections/CreateSections"
import {
  Grid,
  Typography,
  Box,
  tableCellClasses,
  Button,
  Paper,
  Container,
  TableCell,
  TableRow,
  TableContainer,
  TableBody,
  Table,
  TableHead,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import config from "../../config.js";
import SingleSection from './Sections/Single_Section';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#8ECAE6",
    color: "#023047",
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "#FDFCDC",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AdminSection = (props) => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    function getSection() {
      axios
        .get(config.SERVER_URL + '/api/section/sections')
        .then((res) => {
          setSections((res.data).allSections);
        })
        .catch((err) => console.log(err));
    }
    getSection();
  }, []);

  const handleUpdateSection = () => {
    setSections(sections.map());
  };

  return (
    <>
    
      <Grid container spacing={2}
      sx={{
        display:"flex",
        justifyContent:"center",
      }}
       >
      <Typography align="center"
      sx= {{
        p:2
      }}
      >
      <CreateSection />
      </Typography>
        <Paper
          align="center"
          gutterBottom
          sx={{ p: 2 }}
          elevation={0}
        >
        </Paper>
        <Container>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Section Name</StyledTableCell>
                  <StyledTableCell>Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sections.map((section, index) => {
                  return (
                    <>
                    <SingleSection
                      key={index}
                      data={section}
                      handleUpdateSection={handleUpdateSection}
                    />
                    </>
                  );
                })}

              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Grid>
    </>
  );
};

export default withRouter(AdminSection);
