export interface INewsCarouselProps {}
export interface INewsCarouselStates {
  currentSlide: number;
  waitAgain: boolean;
}

export interface INewsHeadline {
  id: number;
  title: string;
  reference: string;
}
