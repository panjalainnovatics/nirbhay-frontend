import React, { useState, ChangeEvent } from "react";
import { Box, Modal, Button, IconButton } from "@mui/material";
import "./UsermanualPopup.scss";
import CloseIcon from "@mui/icons-material/Close";
import IconRenderer from "../Icon/IconRenderer";
import "../ClientDashboard/ClientDashbaord.scss";

interface CustomerVerificationPopupProps {
  open: boolean;
  handleClose: () => void;
  setOpenPopup: (open: boolean) => void;
}

const UsermanualPopup = ({ open, handleClose, setOpenPopup }: any) => {
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
        <div className="modal-title">User Manual</div>

        <div className="coutions-list-container mt-20">
          <div className="text-bold">Electric Shock Device :</div>
          <div className="coutions-list">
            <div className="coution-text">
              <IconRenderer name="BulletIcon" /> Charging voltage input 4.8v or
              any suitable mobile charger can be used. Do not use the device
              while its being charged.
            </div>
          </div>
          <div className="coutions-list">
            <div className="coution-text">
              <IconRenderer name="BulletIcon" /> Follow light indications for
              charging status and battery levels. RED indicates charging status
              and BLUE indicates battery full charge.
            </div>
          </div>

          <div className="coutions-list">
            <div className="coution-text">
              <IconRenderer name="BulletIcon" /> A switch is provided to turn
              the device on and off as per the use. slide the knob to left to
              turn on the device and slide right to off.
            </div>
          </div>
          <div className="coutions-list">
            <div className="coution-text">
              <IconRenderer name="BulletIcon" /> Button located near fingers
              which is helpful in operation the device, maintain 3 seconds pulse
              time in order to achieve longer usage. Use 2 seconds time gap for
              every pulse to get good performance.
            </div>
          </div>
          <div className="coutions-list">
            <div className="coution-text">
              <IconRenderer name="BulletIcon" /> Change lock position of OC
              spray cartridge when in need. Press the actuator to deploy OC
              spray using thumb or forefinger, aiming at the attackers face.
              Depress trigger in short 2 to 3 seconds. The spray will be
              effective for 7ft. protect your face with your hand if the wind is
              blowing in your direction. Immediately run away after spraying and
              inform police.
            </div>
          </div>
          <div className="coutions-list">
            <div className="coution-text">
              <IconRenderer name="BulletIcon" /> There are two separate devices
              in the glove; we need to charge them separately
            </div>
          </div>
          <div className="coutions-list">
            <div className="coution-text">
              <span className="text-bold">DISCLAIMER</span> : Manufacturers &
              promoters are under no liability for loss or damage to life or
              property of any nature whatsoever resulting from use/misuse or
              improper storage of this product. Complete responsibility rests
              with the owner/user. License is not required to use this product.
            </div>
          </div>
          <div className="coutions-list">
            <div className="coution-text">
              <span className="text-bold">Life expectancy</span> : Can be used
              up to 3 years.
            </div>
          </div>
          <div className="coutions-list">
            <div className="coution-text">
              <span className="text-bold">Manufacturer</span> : Panjala
              innovatics Pvt. Ltd. Hayathnagar, Hyderabad, telangana 501505.
            </div>
          </div>
          <div className="coutions-list">
            <div className="coution-text">
              <span className="text-bold">Support</span> :
              <span className="td-underline cursor-pointer">
                info@panjalainnovatics.com
              </span>
            </div>
          </div>

          <div className="coutions-list">
            <div className="coution-text">
              <span className="text-bold">
                Visit our Website for more information
              </span>{" "}
              :{" "}
              <span className="td-underline cursor-pointer">
                https://panjalainnovatics.com
              </span>
            </div>
          </div>
          <div className="coutions-list">
            <div className="coution-text">
              <span className="text-bold">
                We are supporting the Raksha Foundation for Women Safety.
              </span>
            </div>
          </div>
          <div className="coution-container-title">Cautions</div>

          <div className="coutions-list">
            <IconRenderer name="BulletIcon" />
            <div className="coution-text">
              4500v to 8100v (9.0-9.5 mA) pulse output.
            </div>
          </div>
          <div className="coutions-list">
            <IconRenderer name="BulletIcon" />
            <div className="coution-text">
              Do not press the button more than 3 seconds, use break time of 2
              seconds between pulses.
            </div>
          </div>
          <div className="coutions-list">
            <IconRenderer name="BulletIcon" />
            <div className="coution-text">
              Keep Fully Charged for better performance.
            </div>
          </div>
          <div className="coutions-list">
            <IconRenderer name="BulletIcon" />
            <div className="coution-text">
              Turn off the device when not in use.
            </div>
          </div>
          <div className="coutions-list">
            <IconRenderer name="BulletIcon" />
            <div className="coution-text bold-text">
              Device is not water proof!
            </div>
          </div>
          <div className="text-bold">SOS Device :</div>
          <div className="coutions-list">
            <div className="coution-text">
              <IconRenderer name="BulletIcon" /> It takes 1 hr to get fully
              charged, during charging red light will blink. For better
              performance use the cable given in the box.
            </div>
          </div>
          <div className="coutions-list">
            <div className="coution-text">
              <IconRenderer name="BulletIcon" /> Once it is fully charged it
              will work 10 hrs continuosly if the gadget is moving.
            </div>
          </div>
          <div className="coutions-list">
            <div className="coution-text">
              <IconRenderer name="BulletIcon" /> It has over charge protection.
            </div>
          </div>
          <div className="coutions-list">
            <div className="coution-text">
              <IconRenderer name="BulletIcon" /> If it is not moving then
              battery last for 2 days , in on position ,better to switch it off
              when not in use .
            </div>
          </div>
          <div className="coutions-list">
            <div className="coution-text">
              <IconRenderer name="BulletIcon" /> To switch off the device ,press
              the sos button for 9 seconds ,3 lights will on at a time ,then
              release the button.
            </div>
          </div>
          <div className="coutions-list">
            <div className="coution-text">
              <IconRenderer name="BulletIcon" /> To switch on the device , press
              the sos botton for 3 seconds ,one beep sound will come then
              release the button ,three lights will blink continously. read the
              instruction manual carefully.
            </div>
          </div>
          <div className="coutions-list">
            <div className="coution-text">
              <IconRenderer name="BulletIcon" /> To activate the sim and device
              contact to the company watsup number from 10am to 7pm.
            </div>
          </div>
          <div className="coutions-list">
            <div className="coution-text">
              <IconRenderer name="BulletIcon" /> This will work in aborad also
              in few countries ,contact the company if you need international
              roaming service,
            </div>
          </div>
          <div className="coutions-list">
            <div className="coution-text">
              <IconRenderer name="BulletIcon" /> Sim card service charge is 600
              rs for 6 months and 1200 rs for 1 yr. to recharge contact company
              , since it is a m2m sim you can not recharge by yourself.
            </div>
          </div>
          <div className="coutions-list">
            <div className="coution-text">
              <IconRenderer name="BulletIcon" /> You can not use another sim in
              the device ,it will not work.
            </div>
          </div>
        </div>

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

export default UsermanualPopup;
