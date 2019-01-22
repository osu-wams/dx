import React from 'react';
import { faBookReader } from '@fortawesome/free-solid-svg-icons';
import { Card, CardHeader, CardHeaderTitle, CardHeaderSubtitle, CardContent } from '../ui/Card';
import Icon from '../ui/Icon';
import PageTitle from '../ui/PageTitle';
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHeaderCell } from '../ui/Table';
import Badge from '../ui/Badge';

const Dashboard = () => (
  <div data-testid="dashboard-page">
    <PageTitle title="My OSU Dashboard" />
    <Card color="orange">
      <CardHeader>
        <div>
          <CardHeaderTitle>Assignments</CardHeaderTitle>
          <CardHeaderSubtitle>
            <Badge inline badgeContent={3}>
              Due Soon
            </Badge>
          </CardHeaderSubtitle>
        </div>
        <Icon icon={faBookReader} color="orange" size="2x" />
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
