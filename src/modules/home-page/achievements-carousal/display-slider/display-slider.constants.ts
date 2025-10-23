export interface IDisplaySliderProps {
  slider: {
    rank: string;
    comapny: string;
    info: string;
    extraText: string;
    image: string;
    img_info: string;
  };
  isActive: boolean;
  router?: any;
}
export interface IDisplaySliderStates {
  imageToShow: number;
}
