import { NavigateFunction, Params } from "react-router-dom";
import { IMenuItems } from "../../utils/models/menu.model";

export interface IMenuProps {
  open: boolean;
  onClose: () => void;
  menuItems: IMenuItems[];
  router: {
    location: Location;
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
  };
}
export interface IMenuStates {}
