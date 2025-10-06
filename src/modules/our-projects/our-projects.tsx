import { Component, ReactNode } from "react";
import styles from "./our-projects.module.scss";
import ShadowHeading from "../../components/common/headings/shadowHeading/shadowHeading";
import {
  IOurProjectsProps,
  IOurProjectsStates,
} from "./our-projects.constants";
import BreadCrumb from "../../components/common/breadCrumb/breadCrumb";
import Al_Habtoor_city from "./../../images/Al Habtoor city.jpg";
import Dubai_Fountain_project from "./../../images/Dubai Fountain project.jpg";
import Future_museum from "./../../images/Future museum.jpg";
import Palm_Jumeirah from "./../../images/Palm Jumeirah.jpg";
import The_Atlantis_Royal from "./../../images/The Atlantis Royal.jpg";
import jumeirah_park_villas_project from "./../../images/jumeirah park villas-project.jpg";
import jumeirah_park_villas_project1 from "./../../images/jumeirah park villas-project (5).jpg";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";

class OurProjects extends Component<IOurProjectsProps, IOurProjectsStates> {
  componentDidMount(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  itemData = [
    {
      img: Al_Habtoor_city,
      name: "Al Habtoor City",
      title: "Al_Habtoor_city",
    },
    {
      img: Dubai_Fountain_project,
      name: "Dubai Fountain Project",
      title: "Dubai_Fountain_project",
    },
    {
      img: Future_museum,
      name: "Future Museum",
      title: "Future_museum",
    },
    {
      img: jumeirah_park_villas_project,
      name: "Jumeirah Park Villas Project",
      title: "jumeirah_park_villas_project",
    },
    {
      img: jumeirah_park_villas_project1,
      name: "Jumeirah Park Villas Project",
      title: "jumeirah_park_villas_project1",
    },
    {
      img: Palm_Jumeirah,
      name: "Palm Jumeirah",
      title: "Palm_Jumeirah",
    },
    {
      img: The_Atlantis_Royal,
      name: "The Atlantis Royal",
      title: "The_Atlantis_Royal",
    },
  ];
  render(): ReactNode {
    return (
      <div className={styles.ourProjectsContainer}>
        <BreadCrumb
          items={[
            { moduleName: "Home", link: "/home" },
            { moduleName: "Our Projects", link: "" },
          ]}
        />
        <ShadowHeading
          headingText1="Our"
          headingText2="Projects"
          backShadowHeading={false}
        />
        <div className={styles.projects}>
          <ImageList className={styles.imageList} cols={1}>
            {this.itemData.map((item) => (
              <ImageListItem key={item.img} sx={{marginBottom: "1em"}}>
                <img
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.name}
                  position="below"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      </div>
    );
  }
}

export default OurProjects;
