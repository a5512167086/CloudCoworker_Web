export type CustomRouteDrawerProps = {
  routes: { title: string; link: string }[];
  handleDrawerToggle: () => void;
  handleDrawerClose: () => void;
};
