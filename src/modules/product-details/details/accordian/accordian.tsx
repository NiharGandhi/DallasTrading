import { Component, ReactNode } from "react";
import styles from "./accordian.module.scss";
import { IAccordianProps, IAccordianStates } from "./accordian.constants";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import char_img from "./../../../../images/characteristicsRubberCable.png";

class CustomAccordian extends Component<IAccordianProps, IAccordianStates> {
  render(): ReactNode {
    const {
      application,
      construction,
      technicalData,
      characteristics,
      design,
      specification,
      designFeatures,
      technicalSpecifications,
    } = this.props;
    return (
      <div className={styles.accordianCont}>
        {designFeatures ? (
          <Accordion sx={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={styles.AccordionSummary}
            >
              <Typography className={styles.Typography}>
                Design Features
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ maxWidth: "100%" }}>
              <div
                className={styles.text}
                dangerouslySetInnerHTML={{ __html: designFeatures }}
              ></div>
            </AccordionDetails>
          </Accordion>
        ) : null}
        {application ? (
          <Accordion sx={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={styles.AccordionSummary}
            >
              <Typography className={styles.Typography}>Application</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ maxWidth: "100%" }}>
              <div
                className={styles.text}
                dangerouslySetInnerHTML={{ __html: application }}
              ></div>
            </AccordionDetails>
          </Accordion>
        ) : null}
        {construction && Object.entries(construction).length ? (
          <Accordion sx={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={styles.Typography}>
                Construction
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ maxWidth: "100%" }}>
              <table className={styles.table}>
                <tbody>
                  {Object.entries(construction).map((entry: any, i: number) => (
                    <tr key={i} className={styles.trow}>
                      <td className={styles.th}>{entry[0]}</td>
                      <td
                        className={styles.td}
                        dangerouslySetInnerHTML={{ __html: entry[1] }}
                      ></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AccordionDetails>
          </Accordion>
        ) : null}
        {technicalData && Object.entries(technicalData).length ? (
          <Accordion sx={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={styles.Typography}>
                Technical Data
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ maxWidth: "100%" }}>
              <table className={styles.table}>
                <tbody>
                  {Object.entries(technicalData).map(
                    (entry: any, i: number) => (
                      <tr key={i} className={styles.trow}>
                        <td className={styles.th}>{entry[0]}</td>
                        <td
                          className={styles.td}
                          dangerouslySetInnerHTML={{ __html: entry[1] }}
                        ></td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </AccordionDetails>
          </Accordion>
        ) : null}
        {characteristics && Object.entries(characteristics).length ? (
          <Accordion sx={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={styles.Typography}>
                Characteristics
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ maxWidth: "100%" }}>
              <table className={styles.table}>
                <tbody>
                  {Object.entries(characteristics).map(
                    (entry: any, i: number) => (
                      <tr key={i} className={styles.trow}>
                        <td className={styles.th}>{entry[0]}</td>
                        <td
                          className={styles.td}
                          dangerouslySetInnerHTML={{ __html: entry[1] }}
                        ></td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
              <img className={styles.charImg} src={char_img} alt="char_img" />
            </AccordionDetails>
          </Accordion>
        ) : null}
        {design && Object.entries(design).length ? (
          <Accordion sx={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={styles.Typography}>Design</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ maxWidth: "100%" }}>
              <table className={styles.table}>
                <tbody>
                  {Object.entries(design).map((entry: any, i: number) => (
                    <tr key={i} className={styles.trow}>
                      <td className={styles.th}>{entry[0]}</td>
                      <td
                        className={styles.td}
                        dangerouslySetInnerHTML={{ __html: entry[1] }}
                      ></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AccordionDetails>
          </Accordion>
        ) : null}
        {specification && Object.entries(specification).length ? (
          <Accordion sx={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={styles.Typography}>
                Specification
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ maxWidth: "100%" }}>
              <table className={styles.table}>
                <tbody>
                  {Object.entries(specification).map(
                    (entry: any, i: number) => (
                      <tr key={i} className={styles.trow}>
                        <td className={styles.th}>{entry[0]}</td>
                        <td
                          className={styles.td}
                          dangerouslySetInnerHTML={{ __html: entry[1] }}
                        ></td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </AccordionDetails>
          </Accordion>
        ) : null}
        {technicalSpecifications &&
        Object.entries(technicalSpecifications).length ? (
          <Accordion sx={{ width: "100%" }} expanded={true}>
            <AccordionSummary
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={styles.Typography}>
                Technical Specifications
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ maxWidth: "100%" }}>
              <table className={styles.table}>
                <tbody>
                  {Object.entries(technicalSpecifications).map(
                    (entry: any, i: number) => (
                      <tr key={i} className={styles.trow}>
                        <td className={styles.th}>{entry[0]}</td>
                        <td
                          className={styles.td}
                          dangerouslySetInnerHTML={{ __html: entry[1] }}
                        ></td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </AccordionDetails>
          </Accordion>
        ) : null}
      </div>
    );
  }
}

export default CustomAccordian;
