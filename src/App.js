/* eslint-disable react/forbid-prop-types */

import React from 'react';
import { ThemeProvider } from 'styled-components';
import Card, { CardHeader, CardContent } from './components/Card';
import theme from './theme';
import Navbar from './components/Navbar';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableHeaderCell
} from './components/Table';

const App = () => (
  <ThemeProvider theme={theme}>
    <div>
      <Navbar />
      <div style={{ padding: `${theme.spacing.unit * 2}px` }}>
        <Card>
          <CardHeader variant="primary">Header</CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>
    </div>
  </ThemeProvider>
);

export default App;
