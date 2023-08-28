import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';

export const CustomLink = (props: RouterLinkProps & MuiLinkProps) => (
  <MuiLink {...props} component={RouterLink} to={props.to}>
    {props.children}
  </MuiLink>
);
