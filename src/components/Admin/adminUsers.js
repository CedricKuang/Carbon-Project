import axios from "axios";
import config from "../../config";
import React, { useState } from "react";
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#78C6A3",
    color: "#26532b",
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

const getUsers = () =>
  axios.get(config.SERVER_URL + `/api/admin/users`).then((res) => res.data);
const promoteRequest = (UID) =>
  axios
    .post(config.SERVER_URL + `/api/admin/promote`, UID)
    .then((res) => res.data);
const demoteRequest = (UID) =>
  axios
    .post(config.SERVER_URL + `/admin/api/demote`, UID)
    .then((res) => res.data);

    const AdminUsers= (props) => {
      return (
        <>
        <Grid Container spacing={2} >
        <Container
        sx={{p: 2}}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                  <Typography variant = "h6"
                  sx= {{
                    fontWeight: 500,
                    fontFamily: "Gill Sans",
                  }}
                  >
                  User Name
                  </Typography>
                  </StyledTableCell>
                  <StyledTableCell>Position</StyledTableCell>
                  <StyledTableCell>Section</StyledTableCell>
                  <StyledTableCell>Promote</StyledTableCell>
                  <StyledTableCell>Demote</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              <StyledTableRow>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
        </Grid>
        </>
      );
    }

export default withRouter(AdminUsers);