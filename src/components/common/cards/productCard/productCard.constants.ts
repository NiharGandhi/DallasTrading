export interface IProductCardProps {
  data: {
    id: number | string;
    title: string;
    info: string;
    image: string;
    company?: string;
  };
  handleClick: () => void;
}
export interface IProductCardStates {}
