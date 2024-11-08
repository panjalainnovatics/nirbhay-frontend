import React, { useState, ChangeEvent } from "react";
import { Box, Modal, Button, IconButton } from "@mui/material";
import "./ImageViewer.scss";
import CloseIcon from "@mui/icons-material/Close";

interface CustomerVerificationPopupProps {
  open: boolean;
  handleClose: () => void;
  setOpenPopup: (open: boolean) => void;
}

const ImageViewer = ({
  open,
  handleClose,
  setOpenPopup,
  selectedFile,
}: any) => {
  const [preview, setPreview] = useState<string>("");

  /**
   * Function to handle on click yes
   */
  const handleSubmit = () => {
    setOpenPopup(false);
  };

  /**
   * Function to handle on click no
   */
  const handleCancel = () => {
    setOpenPopup(false);
  };

  return (
    <Modal
      className="add-candidate-modal"
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="image-viewer-container">
        {selectedFile && (
          <div className="file-viewer-preview">
            <img
              src={selectedFile}
              alt="Selected file"
              className="image-viewer-preview"
            />
          </div>
        )}
        {/* <div className="modal-actions">
          <Button onClick={handleSubmit}>Yes</Button>
          <Button onClick={handleCancel}>No</Button>
        </div> */}
        <IconButton
          aria-label="close"
          onClick={handleCancel}
          className="close-icon"
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Modal>
  );
};

export default ImageViewer;
