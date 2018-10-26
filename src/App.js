/* eslint-disable react/forbid-prop-types */

import React from 'react';
import { ThemeProvider } from 'styled-components';
import Card, { CardHeader, CardContent } from './components/layout/Card';
import theme from './theme';
import GlobalStyles from './GlobalStyles';
import Navbar from './components/layout/Navbar';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableHeaderCell
} from './components/layout/Table';
import Button from './components/layout/Button';

const App = () => (
  <ThemeProvider theme={theme}>
    <div>
      <GlobalStyles />
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
            <Button variant="primary" outline size="small">
              Button!
            </Button>
            <Button variant="academic" size="large">
              Testo Large
            </Button>
            <Button variant="academic" size="normal">
              Testo Normal
            </Button>
            <Button>Default</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </ThemeProvider>
);

export default App;
