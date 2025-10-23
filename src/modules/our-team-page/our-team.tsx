import { Component, ReactNode } from "react";
import styles from "./our-team.module.scss";
import { IOurTeamProps, IOurTeamStates } from "./our-team.constants";
import ShadowHeading from "../../components/common/headings/shadowHeading/shadowHeading";
import SideImageCard from "../../components/common/cards/sideImageCard/sideImageCard";
import BreadCrumb from "../../components/common/breadCrumb/breadCrumb";
import { connect } from "react-redux";
import { IStore } from "../../utils/models/store.model";
import {
  getOurTeamDetailsData,
  getOurTeamDetailsLoader,
} from "../../store/our-team/ourTeamActions";
import { fetchAsyncOurTeamDetailsData } from "../../store/our-team/ourTeamSlice";
import CustomLoader from "../../components/common/loader/loader";

class OurTeam extends Component<IOurTeamProps, IOurTeamStates> {
  componentDidMount(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.props.fetchAsyncOurTeamDetailsData();
  }
  render(): ReactNode {
    return (
      <div className={styles.ourTeamPageContainer}>
        <div className={styles.backgroundAccent}></div>
        
        <div className={styles.contentWrapper}>
          <BreadCrumb
            items={[
              { moduleName: "Home", link: "/home" },
              { moduleName: "Our Team", link: "" },
            ]}
          />
          
          <div className={styles.headerSection}>
            <div className={styles.headerContent}>
              <ShadowHeading
                headingText1="Our"
                headingText2="Team"
                backShadowHeading={false}
              />
              <p className={styles.description}>
                A team of passionate professionals dedicated to delivering 
                exceptional results with creativity and expertise.
              </p>
            </div>
          </div>

          {this.props.loader ? (
            <div className={styles.loaderContainer}>
              <CustomLoader />
              <p className={styles.loadingText}>Loading our team...</p>
            </div>
          ) : (
            <div className={styles.teamSection}>
              <div className={styles.teamGrid}>
                {this.props.ourTeamDetailsData.map((person, index) => (
                  <div 
                    key={person.id} 
                    className={styles.cardWrapper}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <SideImageCard
                      image={person.image}
                      altTextImg={person.altTextForImg}
                      details={{
                        name: person.name,
                        position: person.position,
                        bio: person.bio,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  (state: IStore) => ({
    ourTeamDetailsData: getOurTeamDetailsData(state),
    loader: getOurTeamDetailsLoader(state),
  }),
  { fetchAsyncOurTeamDetailsData }
)(OurTeam);