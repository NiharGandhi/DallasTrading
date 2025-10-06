import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { IBreadCrumbProps, IBreadCrumbStates } from "./breadCrumb.constants";
import withRouter from "../withRouterComponent/withRouter";

class BreadCrumb extends React.Component<IBreadCrumbProps, IBreadCrumbStates> {
  constructor(props: IBreadCrumbProps) {
    super(props);
    this.state = {
      width: 0,
      isMobileWidth: window.innerWidth <= 640,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount(): void {
    window.addEventListener("resize", this.handleResize);
  }
  componentDidUpdate(
    prevProps: Readonly<IBreadCrumbProps>,
    prevState: Readonly<IBreadCrumbStates>
  ): void {
    if (prevState.width !== this.state.width) {
      this.setState({ isMobileWidth: this.state.width <= 640 });
    }
  }
  handleClick(
    event:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLSpanElement, MouseEvent>,
    link: string
  ) {
    event.preventDefault();
    this.props.router.navigate(link);
  }
  handleResize() {
    this.setState({
      width: window.innerWidth,
      isMobileWidth: window.innerWidth <= 640,
    });
  }
  componentWillUnmount(): void {
    window.removeEventListener("resize", this.handleResize);
  }
  render(): React.ReactNode {
    return (
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        maxItems={this.state.isMobileWidth ? 2 : 5}
        sx={{ marginBottom: "1rem" }}
      >
        {this.props.items.map((item, i) => {
          if (i === this.props.items.length - 1) {
            return (
              <Typography
                key={i}
                fontSize={this.state.isMobileWidth ? "0.8em" : ""}
                color="#686868"
              >
                {item.moduleName}
              </Typography>
            );
          }
          return (
            <Link
              underline="hover"
              key={i}
              fontSize={this.state.isMobileWidth ? "0.8em" : ""}
              color="#AEA9BA"
              href={item.link}
              onClick={(e) => this.handleClick(e, item.link)}
            >
              {item.moduleName}
            </Link>
          );
        })}
      </Breadcrumbs>
    );
  }
}

export default withRouter(BreadCrumb);
