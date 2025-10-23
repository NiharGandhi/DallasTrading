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

class OurProjects extends Component<IOurProjectsProps, IOurProjectsStates> {
  componentDidMount(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  projectsData = [
    {
      id: 1,
      image: Al_Habtoor_city,
      title: "Al Habtoor City"
    },
    {
      id: 2,
      image: Dubai_Fountain_project,
      title: "Dubai Fountain Project"
    },
    {
      id: 3,
      image: Future_museum,
      title: "Future Museum"
    },
    {
      id: 4,
      image: jumeirah_park_villas_project,
      title: "Jumeirah Park Villas"
    },
    {
      id: 5,
      image: jumeirah_park_villas_project1,
      title: "Jumeirah Park Villas Phase 2"
    },
    {
      id: 6,
      image: Palm_Jumeirah,
      title: "Palm Jumeirah"
    },
    {
      id: 7,
      image: The_Atlantis_Royal,
      title: "The Atlantis Royal"
    },
  ];
  render(): ReactNode {
    return (
      <section className={styles.ourProjectsContainer}>
        <BreadCrumb
          items={[
            { moduleName: "Home", link: "/home" },
            { moduleName: "Our Projects", link: ""},
          ]}
        />
        
        <div className={styles.container}>
          <div className={styles.header}>
            <ShadowHeading
              headingText1="Our"
              headingText2="Projects"
              backShadowHeading={false}
            />
            <p className={styles.subtitle}>
              Showcasing our portfolio of successful projects and achievements
            </p>
          </div>
          
          <div className={styles.projectsGrid}>
            {this.projectsData.map((project, index) => (
              <div
                key={project.id}
                className={styles.projectCard}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.imageContainer}>
                  <img
                    className={styles.projectImage}
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                  />
                </div>
                
                <div className={styles.content}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default OurProjects;
