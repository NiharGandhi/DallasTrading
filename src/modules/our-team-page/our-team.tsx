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
        <BreadCrumb
          items={[
            { moduleName: "Home", link: "/home" },
            { moduleName: "Our Team", link: "" },
          ]}
        />
        <ShadowHeading
          headingText1="Our"
          headingText2="Team"
          backShadowHeading={false}
        />
        {this.props.loader ? (
          <div className={styles.loaderDiv}>
            <CustomLoader />
          </div>
        ) : (
          <div className={styles.teamDetails}>
            {this.props.ourTeamDetailsData.map((person) => (
              <SideImageCard
                key={person.id}
                image={person.image}
                altTextImg={person.altTextForImg}
                details={{
                  name: person.name,
                  position: person.position,
                  bio: person.bio,
                }}
              />
            ))}
          </div>
        )}
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
