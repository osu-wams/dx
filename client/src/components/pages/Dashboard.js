import React from 'react';
import { faBookReader } from '@fortawesome/free-solid-svg-icons';
import { Card, CardHeader, CardHeaderTitle, CardHeaderSubtitle, CardContent } from '../layout/Card';
import Icon from '../layout/Icon';
import PageTitle from '../layout/PageTitle';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableHeaderCell
} from '../layout/Table';
import Badge from '../layout/Badge';

const Dashboard = () => (
  <div data-testid="dashboard-page">
    <PageTitle title="My OSU Dashboard" />
    <Card color="orange">
      <CardHeader>
        <CardHeaderTitle>
          <Icon icon={faBookReader} color="orange" />
          Assignments
        </CardHeaderTitle>
        <CardHeaderSubtitle>
          <Badge inline badgeContent={3}>
            Due Soon
          </Badge>
        </CardHeaderSubtitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>1 Header</TableHeaderCell>
              <TableHeaderCell>Another Header</TableHeaderCell>
              <TableHeaderCell>This is it</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>2</TableCell>
              <TableCell>3</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>2</TableCell>
              <TableCell>3</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>2</TableCell>
              <TableCell>3</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>2</TableCell>
              <TableCell>3</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>2</TableCell>
              <TableCell>3</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
);

export default Dashboard;
