import React from 'react';
import { faBookReader } from '@fortawesome/free-solid-svg-icons';
import Card from '../layout/Card';
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
  <React.Fragment>
    <Card
      title="Assignments"
      headerIcon={faBookReader}
      subtitle={
        <Badge inline badgeContent={3}>
          Due Soon
        </Badge>
      }
    >
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
    </Card>
  </React.Fragment>
);

export default Dashboard;
