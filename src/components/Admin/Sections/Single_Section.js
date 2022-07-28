import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import config from '../../../config';

import axios from 'axios';

//material UI components
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

const SingleSection = (props) => {
  const [deleteSectionModalOpen, setDeleteSectionModalOpen] = useState(false);

  const modalCustomStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const { data } = props;
  console.log(data);
  const handleDeleteSection = (id) => {
    axios
      .delete(config.SERVER_URL + `/api/admin/${id}`)
      .then((res) => {
        alert(res.data);
        window.location.reload();
        setDeleteSectionModalOpen(false);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <TableRow>
        <TableCell>{data.sectionName}</TableCell>

        <TableCell>
          <Button size="small" color="error" variant="outlined" onClick={() => setDeleteSectionModalOpen(true)}>
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <Modal
        isOpen={deleteSectionModalOpen}
        onRequestClose={() => setDeleteSectionModalOpen(false)}
        ariaHideApp={false}
        style={modalCustomStyles}
      >
        <p>Are you sure you want to delete this section?</p>
        <Buttons onClick={() => handleDeleteSection(data['_id'])}>Delete</Buttons>
        <Buttons onClick={() => setDeleteSectionModalOpen(false)}>Cancel</Buttons>
      </Modal>
    </>
  );
}
const Buttons = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 0.2rem;
  width: 6em;
  background: white;
  color: black;
  border: 2px solid palevioletred;
`;

export default SingleSection;