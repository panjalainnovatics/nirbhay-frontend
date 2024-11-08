import { useState } from "react";
import "./ConfirmationPopup.scss";
import { Box, Modal } from "@mui/material";
import { TibButton } from "../TIbbutton/Tibbutton";

export const ConfirmationPopup = ({
  open,
  handleClose,
  title,
  setOpenPopup,
  handleConfirm,
}: any) => {
  const [close, setClose] = useState(0);

  /**
   *Function to handle on click yes
   */
  const handleSubmit = () => {
    handleConfirm();
    setOpenPopup(false);
  };

  /**
   * Function to handle on click no
   */
  const handleCancel = () => {
    setClose(close + 1);
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
      <Box className="add-candidate-container">
        <div className="modal-title">{title}</div>

        <div className="modal-btn-section">
          <TibButton
            onClick={handleCancel}
            className="outlined-icon-btn cancel-btn"
          >
            No
          </TibButton>
          <>
            <TibButton
              onClick={handleSubmit}
              className="primary-btn verification-btn"
            >
              Yes
            </TibButton>
          </>
        </div>
      </Box>
    </Modal>
  );
};
