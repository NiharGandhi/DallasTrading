import styles from "./loader.module.scss";
import { Component, ReactNode } from "react";
import { ClipLoader } from "react-spinners";

class CustomLoader extends Component {
  render(): ReactNode {
    return (
      <div className={styles.loader}>
        <ClipLoader color="#003c75" size={86} />
      </div>
    );
  }
}

export default CustomLoader;
