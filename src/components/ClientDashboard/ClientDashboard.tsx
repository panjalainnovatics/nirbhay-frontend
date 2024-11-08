import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import "./ClientDashbaord.scss";
import IconRenderer from "../Icon/IconRenderer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UsermanualPopup from "../UsermanualPopup/UsermanualPopup";
import QRimg from "./QRcode-nirbhay.svg";
const ClientDashboard = () => {
  const [openPopup, setOpenPopup] = useState<boolean>();

  const videoLinks = [
    "https://www.youtube.com/embed/Jfmvf8H1zww",
    "https://www.youtube.com/embed/Vs1-j3J9eo4",
    "https://www.youtube.com/embed/5SVSQ0ouYec",
  ];

  return (
    <div>
      <div className="display-f gap-1">
        <div className="self-gadget-container">
          <div className="self-gadget-container-title">NIRBHAY GADGET</div>
          <div className="self-gadget-container-card-container">
            <div className="total-revenue-section grey-bg row-align-justify-between">
              <div>
                <p className="fs-16 tb-fw-semibold text-primary-color">
                  {/* Charged Battery can be operated up to 200 pulses */}
                  Electric Shock
                  <br />
                  {/* <span className="sub-text-gadget-container">
                    (Each Pulse time of 3 seconds)
                  </span> */}
                </p>
              </div>

              <div className="revenue-img row-align-justify-center">
                {/* <IconRenderer name="BatteryIcon" /> */}
                <IconRenderer name="ChargingIcon" />
              </div>
            </div>
            <div className="total-revenue-section grey-bg row-align-justify-between">
              <div>
                <p className="fs-16 tb-fw-semibold text-primary-color">
                  {/* It will be fully charged in 15minutes consumes less than 1.9 A */}
                  Chemical Spray
                  <br />
                  <span className="sub-text-gadget-container">
                    {/* (using Micro USB cable) */}
                  </span>
                </p>
              </div>

              <div className="revenue-img row-align-justify-center">
                {/* <IconRenderer name="ChargingIcon" /> */}
                <IconRenderer name="SprayIcon" />
              </div>
            </div>
            <div className="total-revenue-section grey-bg row-align-justify-between">
              <div>
                <p className="fs-16 tb-fw-semibold text-primary-color">
                  {/* 1 month standby time */}
                  Sends SOS messages to 5 emergency contacts as a WhatsApp
                  message & SMS
                </p>
              </div>

              <div className="revenue-img row-align-justify-center">
                {/* <IconRenderer name="BatteryIcon" /> */}
                <IconRenderer name="SOS" />
              </div>
            </div>
            <div className="total-revenue-section grey-bg row-align-justify-between">
              <div>
                <p className="fs-16 tb-fw-semibold text-primary-color">
                  {/* 21ml (14g) OC spray cartridge */}
                  Calling option is available <br />
                  <span className="sub-text-gadget-container">
                    {/* (using Micro USB cable) */}
                    (Can talk with only company person)
                  </span>
                </p>
              </div>

              <div className="revenue-img row-align-justify-center">
                {/* <IconRenderer name="SprayIcon" /> */}
                <IconRenderer name="Call-svg" />
              </div>
            </div>
            <div className="total-revenue-section grey-bg row-align-justify-between">
              <div>
                <p className="fs-16 tb-fw-semibold text-primary-color">
                  {/* Washable Glove and Detachable device */}
                  Company can call to gadget, It auto answers the call & hear
                  surroundings
                </p>
              </div>

              <div className="revenue-img row-align-justify-center">
                {/* <IconRenderer name="WashingIcon" /> */}
                <IconRenderer name="PersonIcon" />
              </div>
            </div>
            <div className="total-revenue-section grey-bg row-align-justify-between">
              <div>
                <p className="fs-16 tb-fw-semibold text-primary-color">
                  {/* Comfortable and easy to wear glove,can be worn while driving */}
                  Can be used in abroad
                </p>
              </div>

              <div className="revenue-img row-align-justify-center">
                {/* <IconRenderer name="DrivingIcon" /> */}
                <IconRenderer name="WorldIcon" />
              </div>
            </div>
          </div>
        </div>

        <div className="graph-container">
          <div className="coution-container-title">
            {/* <span className="coution-container-title"> */}
            Rape Cases Report In India
            {/* </span> */}
          </div>
          <IconRenderer name="Graph" />
          {/* <div className="coution-container-title">Cautions</div>
          <div className="coutions-list-container">
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
          </div> */}
        </div>
      </div>
      <div className="display-f gap-1 margin-top-20 containers">
        <div className="manual-container">
          <div className="coution-container-title">User Manual</div>
          <div className="coutions-list-container">
            <div className="text-bold">Electric Shock Device :</div>
            <div className="coutions-list">
              <IconRenderer name="BulletIcon" />
              <div className="coution-text">
                Charging voltage input 4.8v or any suitable mobile charger can
                be used. Do not use the device while its being charged.
              </div>
            </div>
            <div className="coutions-list">
              <IconRenderer name="BulletIcon" />
              <div className="coution-text">
                Follow light indications for charging status and battery levels.
                RED indicates charging status and BLUE indicates battery full
                charge.
              </div>
            </div>
            {/* <div className="coutions-list">
              <IconRenderer name="BulletIcon" />
              <div className="coution-text">
                A switch is provided to turn the device on and off as per the
                use. slide the knob to left to turn on the device and slide
                right to off.
              </div>
            </div> */}
            <div className="btn-con">
              <button
                className="view-more-button "
                onClick={() => setOpenPopup(true)}
              >
                View More
              </button>
            </div>
          </div>
        </div>
        <div className="containes-container">
          <div className="coution-container-title">Contains</div>
          <div className="list-contianer-contains">
            <div className="contains-list">
              <IconRenderer name="BulletIcon" />
              <div className="coution-text">Electrical Stun Glove</div>
            </div>
            <div className="contains-list">
              <IconRenderer name="BulletIcon" />
              <div className="coution-text">Charging Cable</div>
            </div>
            <div className="contains-list">
              <IconRenderer name="BulletIcon" />
              <div className="coution-text">OC Spray</div>
            </div>
            <div className="contains-list">
              <IconRenderer name="BulletIcon" />
              <div className="coution-text">User Manual</div>
            </div>
            <div className="contains-list">
              <IconRenderer name="BulletIcon" />
              <div className="coution-text">SOS Device</div>
            </div>
          </div>
          <div className="bg-grey-container">
            <div>Keep out of reach of children.</div>
            <div>
              For warranty information see website below :{" "}
              <a className="link-text bold-text">
                https://panjalainnovatics.com
              </a>
            </div>
            <div>
              Email :
              <span className="bold-text"> info@panjalainnovatics.com</span>
            </div>
          </div>
          {/* <div className="btn-con">
            <button className="view-more-button">View More</button>
          </div> */}
        </div>
        <div className="cautions-container">
          <div className="coution-container-title">Payment Details</div>
          <div className="qr-image-container">
            <img src={QRimg} alt="QRCode image" className="QR-img" />
          </div>
          <div className="QRcodeUPI">UPI ID: 9640930294@ybl</div>
        </div>
      </div>
      <div className=" margin-top-20">
        <div className="video-title">Self Defence Gadget Video</div>
        <div className="video-list-container display-f gap-1">
          {videoLinks.map((videoUrl, index) => {
            return (
              <div className="video-item-container">
                <VideoCard videoUrl={videoUrl} />
                {/* <div className="video-name-container">
                  <IconRenderer name="VideoIcon" />
                  Video Name
                </div>
                <div className="timeline">01:23 | May 18,2024</div> */}
              </div>
            );
          })}
        </div>
      </div>
      <div className="display-f gap-1 margin-top-20">
        <div className="faq-container ">
          <div className="coution-container-title ">Contact Us</div>
          <div className="faq-list">
            <div>
              Website :{" "}
              <a className="link-text bold-text">
                https://panjalainnovatics.com
              </a>
            </div>
            <div className="margin-top-20">
              Email :
              <span className="bold-text"> info@panjalainnovatics.com</span>
            </div>
          </div>
        </div>
        <div className="follow-container">
          <div className="follow-title">Follow US</div>
          <div className="display-f gap-1 margin-t-20 ">
            <div>
              <IconRenderer name="YoutubeIcon" />
            </div>
            <div>
              <div className="social-name">Youtube</div>
              <div
                className="social-link"
                onClick={() =>
                  window.open(
                    "https://youtube.com/@panjalainnovatics?feature=shared",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                https://youtube.com/@panjalainnovatics?feature=shared
              </div>
            </div>
          </div>
          <div className="display-f gap-1 margin-t-20 ">
            <div>
              <IconRenderer name="InstaIcon" />
            </div>
            <div>
              <div className="social-name">Instagram</div>
              <div
                className="social-link"
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/panjalainnovatics?igsh=b3dxeWd2YmhqaHR1",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                https://www.instagram.com/panjalainnovatics?igsh=b3dxeWd2YmhqaHR1
              </div>
            </div>
          </div>
          <div className="display-f gap-1 margin-t-20 ">
            <div>
              <IconRenderer name="FacebookIcon" />
            </div>
            <div>
              <div className="social-name">Facebook</div>
              <div
                className="social-link"
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/profile.php?id=100088699332172",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                https://www.facebook.com/profile.php?id=100088699332172
              </div>
            </div>
          </div>
          <div className="display-f gap-1 margin-t-20 ">
            <div>
              <IconRenderer name="WebsiteIcon" />
            </div>
            <div>
              <div className="social-name">Website</div>
              <div
                className="social-link"
                onClick={() =>
                  window.open(
                    "https://panjalainnovatics.com/",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                https://panjalainnovatics.com/
              </div>
            </div>
          </div>
        </div>
      </div>
      {openPopup && (
        <UsermanualPopup open={openPopup} setOpenPopup={setOpenPopup} />
      )}
    </div>
  );
};

export default ClientDashboard;

const VideoCard = ({ videoUrl }: any) => {
  return (
    <Card className="video-card">
      <CardMedia
        component="iframe"
        src={videoUrl}
        className="video-card-iframe"
        // height="200"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <CardContent className="video-card-content">
        <Typography variant="body2" component="p">
          {videoUrl}
        </Typography>
      </CardContent>
    </Card>
  );
};
