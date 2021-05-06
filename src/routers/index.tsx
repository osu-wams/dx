import { RouteComponentProps } from '@reach/router';

export const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) =>
  props.pageComponent;
