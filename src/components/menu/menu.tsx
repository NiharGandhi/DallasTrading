import * as React from "react";
import styles from "./menu.module.scss";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { IMenuProps, IMenuStates } from "./menu.constants";
import menu_img from "./../../images/dallaswhitelogo.png";
import withRouter from "../common/withRouterComponent/withRouter";
import { connect } from "react-redux";
import { IStore } from "../../utils/models/store.model";
import { getMenuItems } from "../../store/menu/menuActions";
import CloseIcon from "@mui/icons-material/Close";

class Menu extends React.Component<IMenuProps, IMenuStates> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  render(): React.ReactNode {
    const { open, onClose, menuItems, router } = this.props;
    return (
      <Drawer
        anchor={"top"}
        open={open}
        onClose={onClose}
        className={styles.drawerContainer}
      >
        <CloseIcon className={styles.closeIcon} onClick={() => onClose()} />
        <Box className={styles.drawerBox}>
          <img src={menu_img} alt="menu_img" className={styles.menuImg} />
          <List>
            {menuItems.map((menuItem) => (
              <ListItem
                key={menuItem.id}
                onClick={() => {
                  onClose();
                  router.navigate(menuItem.path);
                }}
              >
                <ListItemButton className={styles.item}>
                  {menuItem.name}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    );
  }
}

export default connect((state: IStore) => ({ menuItems: getMenuItems(state) }))(
  withRouter(Menu)
);
