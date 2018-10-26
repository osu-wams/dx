/* eslint-disable react/forbid-prop-types */

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { faBookReader } from '@fortawesome/free-solid-svg-icons';
import Card from './components/layout/Card';
import theme from './theme';
import Navbar from './components/layout/Navbar';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableHeaderCell
} from './components/layout/Table';
import Badge from './components/layout/Badge';

const App = () => (
  <ThemeProvider theme={theme}>
    <div>
      <Navbar />
      <div style={{ padding: `${theme.spacing.unit * 2}px` }}>
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
              <TableHeaderCell>1</TableHeaderCell>
              <TableHeaderCell>1</TableHeaderCell>
              <TableHeaderCell>1</TableHeaderCell>
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
      </div>
    </div>
  </ThemeProvider>
);

export default App;
