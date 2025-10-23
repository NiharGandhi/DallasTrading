import * as React from "react";
import styles from "./productCard.module.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { IProductCardProps, IProductCardStates } from "./productCard.constants";

class ProducCard extends React.Component<
  IProductCardProps,
  IProductCardStates
> {
  render(): React.ReactNode {
    const {
      data: { title, info, image, company },
    } = this.props;
    return (
      <CardActionArea
        className={styles.cardContainer}
        sx={{
          width: "100%",
          maxWidth: "380px",
          height: "480px",
          boxSizing: "border-box",
          background: "linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)",
          border: "1px solid rgba(0, 60, 117, 0.08)",
          borderRadius: "16px",
          overflow: "hidden",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #003C75 0%, #EE3342 100%)",
            opacity: 0,
            transition: "opacity 0.4s ease",
          },
          "&:hover": {
            boxShadow: "0 12px 40px rgba(0, 60, 117, 0.15), 0 4px 16px rgba(0, 0, 0, 0.08)",
            transform: "translateY(-8px) scale(1.02)",
            border: "1px solid rgba(0, 60, 117, 0.15)",
          },
          "&:hover::before": {
            opacity: 1,
          },
        }}
        onClick={this.props.handleClick}
      >
        <Card className={styles.card}>
          <CardMedia
            component="img"
            image={image}
            className={styles.cardImg}
            alt="green iguana"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              align="center"
              color={"#003C75"}
              sx={{ fontWeight: 600, marginBottom: company ? "0em" : "1em" }}
            >
              {title}
            </Typography>
            {company ? (
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                align="center"
                color={"#686868"}
                sx={{ fontWeight: 600, marginBottom: "1em" }}
              >
                {company}
              </Typography>
            ) : null}
            <Typography variant="body2" color="#AEA9BA">
              {info}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    );
  }
}

export default ProducCard;
