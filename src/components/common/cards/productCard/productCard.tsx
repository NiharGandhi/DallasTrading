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
          width: "25em",
          height: "35em",
          boxSizing: "border-box",
          boxShadow: "0px 0px 23px rgba(0, 0, 0, 0.13)",
          marginTop: "4rem",
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
