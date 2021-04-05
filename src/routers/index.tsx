import { RouteComponentProps } from '@reach/router';
import { Routes, Dashboards } from './routes';

export const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) =>
  props.pageComponent;

export { Routes, Dashboards };
