import React, { useContext, useEffect } from "react";
import "./Faqs.scss";
import { BreadCrumbContext } from "../../services/Context/Context";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
const Faqs = () => {
  const header = {
    Icon: "FaqIconBlack",
    title: "FAQ's",
    breadCrumbsData: [],
  };
  const BreadCrumbs = useContext(BreadCrumbContext);
  useEffect(() => {
    BreadCrumbs.setBreadCrumb(header);
  }, []);
  return (
    <div>
      {" "}
      <div className="faq-container">
        <div className="faq-list">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              className="accordian-heading"
            >
              Is it legal to use in India ?
            </AccordionSummary>
            <AccordionDetails className="accordian-text">Yes</AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              className="accordian-heading"
            >
              Is warranty available ?
            </AccordionSummary>
            <AccordionDetails className="accordian-text">
              Yes, 1 year
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              className="accordian-heading"
            >
              Can we charge it ?
            </AccordionSummary>
            <AccordionDetails className="accordian-text">
              Yes it has a rechargeble battery
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              className="accordian-heading"
            >
              Can we wash the glove ?
            </AccordionSummary>
            <AccordionDetails className="accordian-text">Yes</AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              className="accordian-heading"
            >
              Can we order only glove ?
            </AccordionSummary>
            <AccordionDetails className="accordian-text">
              Yes, from the company website
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              className="accordian-heading"
            >
              Can we drive the bike by wearing glove ?
            </AccordionSummary>
            <AccordionDetails className="accordian-text">Yes</AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              className="accordian-heading"
            >
              Does this electric shock paralise the person ?
            </AccordionSummary>
            <AccordionDetails className="accordian-text">No</AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              className="accordian-heading"
            >
              From how long can we spray the chemical ?
            </AccordionSummary>
            <AccordionDetails className="accordian-text">
              10 feet
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              className="accordian-heading"
            >
              Is that chemical causes blindness ?
            </AccordionSummary>
            <AccordionDetails className="accordian-text">
              No, it gives burning sensation
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              className="accordian-heading"
            >
              What happens by spraying the chemical
            </AccordionSummary>
            <AccordionDetails className="accordian-text">
              It causes burning, sneezing, tears when it comes into contact with
              eyes and face
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              className="accordian-heading"
            >
              Is the shock really powerfull ?
            </AccordionSummary>
            <AccordionDetails className="accordian-text">
              Yes, it gives 4K-7K pulse voltage
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              className="accordian-heading"
            >
              For how many people can we send location ?
            </AccordionSummary>
            <AccordionDetails className="accordian-text">4</AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              className="accordian-heading"
            >
              How long we need to press button to send the location ?
            </AccordionSummary>
            <AccordionDetails className="accordian-text">
              2 seconds
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              className="accordian-heading"
            >
              Do we need to recharge the SIM every year
            </AccordionSummary>
            <AccordionDetails className="accordian-text">
              Yes, manufacturer gives 1 year when purchased
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              className="accordian-heading"
            >
              Can we call to the gadget number ?
            </AccordionSummary>
            <AccordionDetails className="accordian-text">No</AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              className="accordian-heading"
            >
              Can we track the gadget ?
            </AccordionSummary>
            <AccordionDetails className="accordian-text">
              Yes, request gadget location form the registered emergency contact
              list numbers only
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              className="accordian-heading"
            >
              Is voice recording option available in the gadget ?
            </AccordionSummary>
            <AccordionDetails className="accordian-text">
              {" "}
              Yes, request voice record form the registered emergency contact
              list numbers only
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              className="accordian-heading"
            >
              Do we need to go to store for SIM activation ?
            </AccordionSummary>
            <AccordionDetails className="accordian-text">
              No, look into the SIM activation process in website
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
