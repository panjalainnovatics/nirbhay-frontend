// import React, { useState, ChangeEvent } from "react";
// import {
//   Box,
//   Modal,
//   Button,
//   IconButton,
//   TextField,
//   MenuItem,
// } from "@mui/material";
// import "./CustomerVerificationPopup.scss";
// import CloseIcon from "@mui/icons-material/Close";

// interface CustomerVerificationPopupProps {
//   open: boolean;
//   handleClose: () => void;
//   setOpenPopup: (open: boolean) => void;
// }

// const CustomerVerificationPopup = ({
//   open,
//   handleClose,
//   setOpenPopup,
// }: any) => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string>("");

//   /**
//    * Function to handle file input change
//    */
//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files ? event.target.files[0] : null;
//     setSelectedFile(file);

//     if (file && file.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setPreview("");
//     }
//   };

//   /**
//    * Function to handle on click yes
//    */
//   const handleSubmit = () => {
//     setOpenPopup(false);
//   };

//   /**
//    * Function to handle on click no
//    */
//   const handleCancel = () => {
//     setOpenPopup(false);
//   };

//   return (
//     <Modal
//       className="add-candidate-modal"
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box className="add-verification-container">
//         <div className="modal-title">
//           Please complete the verification!{" "}
//           <div className="modal-sub-title">
//             Upload your goverment issued photo id for verification
//           </div>
//         </div>

//         <TextField
//           className="input-field-50 w-100 in-doc-type"
//           select
//           id="document"
//           name="document"
//           label="Document type*"
//           // value={formik.values.gadget}
//           // onChange={formik.handleChange}
//           // onBlur={formik.handleBlur}
//           // error={formik.touched.gadget && Boolean(formik.errors.gadget)}
//           // helperText={formik.touched.gadget && formik.errors.gadget}
//         >
//           <MenuItem value="aadhar-card">Aadhar Card</MenuItem>
//           <MenuItem value="pan-card">Pan Card</MenuItem>
//           <MenuItem value="voter-id">Voter Id</MenuItem>
//           <MenuItem value="driving-licence">Driving Licence</MenuItem>
//         </TextField>

//         <div className="file-input-container">
//           <input
//             type="file"
//             accept="image/*,.pdf"
//             onChange={handleFileChange}
//             id="file-upload"
//             style={{ display: "none" }}
//           />
//           <label htmlFor="file-upload" className="file-upload-button">
//             Choose File
//           </label>
//         </div>
//         {selectedFile && (
//           <div className="file-preview">
//             {selectedFile.type.startsWith("image/") ? (
//               <img
//                 src={preview}
//                 alt="Selected file"
//                 className="image-preview"
//               />
//             ) : (
//               <span className="file-name">{selectedFile.name}</span>
//             )}
//           </div>
//         )}
//         {/* <div className="modal-actions">
//           <Button onClick={handleSubmit}>Yes</Button>
//           <Button onClick={handleCancel}>No</Button>
//         </div> */}
//         <IconButton
//           aria-label="close"
//           onClick={handleCancel}
//           className="close-icon"
//         >
//           <CloseIcon />
//         </IconButton>
//       </Box>
//     </Modal>
//   );
// };

// export default CustomerVerificationPopup;

import React, { useState, ChangeEvent } from "react";
import { Box, Modal, IconButton, TextField, MenuItem } from "@mui/material";
import "./CustomerVerificationPopup.scss";
import CloseIcon from "@mui/icons-material/Close";

interface CustomerVerificationPopupProps {
  open: boolean;
  handleClose: () => void;
  setOpenPopup: (open: boolean) => void;
}

const CustomerVerificationPopup = ({
  open,
  handleClose,
  setOpenPopup,
}: any) => {
  const [frontPart, setFrontPart] = useState<File | null>(null);
  const [backPart, setBackPart] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string>("");
  const [backPreview, setBackPreview] = useState<string>("");

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    setPart: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    setPart(file);

    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else if (file.type === "application/pdf") {
        setPreview(file.name);
      }
    } else {
      setPreview("");
    }
  };

  const handleCancel = () => {
    setFrontPart(null);
    setBackPart(null);
    setFrontPreview("");
    setBackPreview("");
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
      <Box className="add-verification-container">
        <div className="modal-title">
          Please complete the verification!{" "}
          <div className="modal-sub-title">
            Upload your government-issued photo ID for verification
          </div>
        </div>

        <TextField
          className="input-field-50 w-100 in-doc-type"
          select
          id="document"
          name="document"
          label="Document type*"
          onChange={() => {
            setFrontPart(null);
            setBackPart(null);
            setFrontPreview("");
            setBackPreview("");
          }}
        >
          <MenuItem value="aadhar-card">Aadhar Card</MenuItem>
          <MenuItem value="pan-card">Pan Card</MenuItem>
          <MenuItem value="voter-id">Voter Id</MenuItem>
          <MenuItem value="driving-licence">Driving Licence</MenuItem>
        </TextField>

        <div className="file-inputs">
          <div className="dotted-input-container">
            <div>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) =>
                  handleFileChange(e, setFrontPart, setFrontPreview)
                }
                id="front-part-upload"
                style={{ display: "none" }}
              />
              {!frontPart ? (
                <label htmlFor="front-part-upload" className="dotted-input">
                  Upload Front Part
                </label>
              ) : (
                <div className="dotted-preview">
                  {frontPreview.endsWith(".pdf") ? (
                    <span className="file-name">{frontPreview}</span>
                  ) : (
                    <img
                      src={frontPreview}
                      alt="Front Part Preview"
                      className="image-preview"
                    />
                  )}
                  <IconButton
                    aria-label="close"
                    onClick={() => {
                      setFrontPart(null);
                      setFrontPreview("");
                    }}
                    className="dotted-close-icon"
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              )}
            </div>
          </div>

          <div className="dotted-input-container">
            <div>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) =>
                  handleFileChange(e, setBackPart, setBackPreview)
                }
                id="back-part-upload"
                style={{ display: "none" }}
              />
              {!backPart ? (
                <label htmlFor="back-part-upload" className="dotted-input">
                  Upload Back Part
                </label>
              ) : (
                <div className="dotted-preview">
                  {backPreview.endsWith(".pdf") ? (
                    <span className="file-name">{backPreview}</span>
                  ) : (
                    <img
                      src={backPreview}
                      alt="Back Part Preview"
                      className="image-preview"
                    />
                  )}
                  <IconButton
                    aria-label="close"
                    onClick={() => {
                      setBackPart(null);
                      setBackPreview("");
                    }}
                    className="dotted-close-icon"
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              )}
            </div>
          </div>
        </div>

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

export default CustomerVerificationPopup;
