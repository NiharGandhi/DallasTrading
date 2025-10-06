import { Component, ReactNode } from "react";
import styles from "./our-products.module.scss";
import {
  IOurProductsProps,
  IOurProductsStates,
} from "./our-products.constants";
import ShadowHeading from "../../../components/common/headings/shadowHeading/shadowHeading";
import StylishUpDownCard from "../../../components/common/cards/stylishUpDownCard/stylishUpDownCard";
import industrial_plugs_and_sockets_img from "./../../../images/industrial_plugs_and_sockets.png";
import flexible_conduit_accessories_img from "./../../../images/flexible-conduit-accessories.png";
import cable_termination_kit_img from "./../../../images/cable-termination-kit.png";
import tsj_sc_img from "./../../../images/TSJ-SC.png";
import withRouter from "../../../components/common/withRouterComponent/withRouter";

class OurProducts extends Component<IOurProductsProps, IOurProductsStates> {
  constructor(props: IOurProductsProps) {
    super(props);
    this.handleClickOnCard = this.handleClickOnCard.bind(this);
  }
  handleClickOnCard(id: string) {
    this.props.router.navigate("/our-products/" + id);
  }
  render(): ReactNode {
    return (
      <div className={styles.ourProducts}>
        <div className={styles.heading}>
          <div className={styles.headingText}>
            <ShadowHeading headingText1="Our" headingText2="Products" />
          </div>
          <button
            className={styles.viewAllBtn}
            onClick={() => this.props.router.navigate("/our-products")}
          >
            View All
          </button>
        </div>
        <div className={styles.products}>
          <div className={styles.col1}>
            <StylishUpDownCard
              altText="card1"
              image={industrial_plugs_and_sockets_img}
              handleClick={() => this.handleClickOnCard("industrial_plugs_and_sockets")}
              info={
                "Industrial Plugs & Sockets provide a connection to the electrical mains rated at higher voltages and currents than household Plugs & Sockets."
              }
            />
            <StylishUpDownCard
              altText="card3"
              image={cable_termination_kit_img}
              handleClick={() => this.handleClickOnCard("cable_jointing_kit")}
              info={
                "3M™ Wire Pulling Lubricants are designed for specific applications such as cable pulling, moisture and corrosion protection, and preventing build up of glues, wax, inks, and paint."
              }
            />
          </div>
          <div className={styles.col2}>
            <StylishUpDownCard
              altText="card2"
              image={flexible_conduit_accessories_img}
              handleClick={() => this.handleClickOnCard("flexiblerigid_conduit_and_accessories")}
              info={
                "Rigid metal conduit is a thick-walled threaded tubing, usually made of coated steel, stainless steel or aluminum. Galvanized rigid conduit is a tubing wall that is thick enough to allow it to be threaded."
              }
            />
            <StylishUpDownCard
              altText="card2"
              image={tsj_sc_img}
              handleClick={() => this.handleClickOnCard("Resin_Jointing_Kits")}
              info={
                "Resin-filled joints Type TSJ-SC for armoured and unarmoured power and control cables up to 1kV. For armoured cables additional accessories are required and have to be ordered separately."
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(OurProducts);
