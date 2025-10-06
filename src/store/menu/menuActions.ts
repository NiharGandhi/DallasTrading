import { IStore } from "../../utils/models/store.model";

export const getMenuItems = (state: IStore) => state.menu.menuItems;
