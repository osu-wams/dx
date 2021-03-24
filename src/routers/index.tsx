import { RouteComponentProps } from '@reach/router';
import { Routes } from './routes';

export const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) =>
  props.pageComponent;

export { Routes };
