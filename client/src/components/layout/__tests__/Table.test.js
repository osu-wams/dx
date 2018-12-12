import React from 'react';
import { render } from '../../../componentTestUtils';
import { Table, TableBody, TableRow, TableCell } from '../Table';

const DefaultTable = () => (
  <div>
    <Table>
      <caption>Default Table</caption>
      <TableBody>
        <TableRow>
          <TableCell>One col</TableCell>
          <TableCell>Two col</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
);

const BasicTable = () => (
  <div>
    <Table variant="basic">
      <caption>Basic Table</caption>
      <TableBody>
        <TableRow>
          <TableCell>One col</TableCell>
          <TableCell>Two col</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
);

const CompactTable = () => (
  <div>
    <Table variant="compact">
      <caption>Compact Table</caption>
      <TableBody>
        <TableRow>
          <TableCell>One col</TableCell>
          <TableCell>Two col</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
);

const StripedTable = () => (
  <div>
    <Table variant="basic" striped>
      <caption>Basic Table</caption>
      <tbody>
        <TableRow>
          <TableCell>One col</TableCell>
          <TableCell>Two col</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>One col</TableCell>
          <TableCell>Two col</TableCell>
        </TableRow>
      </tbody>
    </Table>
  </div>
);

describe('<Table />', () => {
  test('DefaultTable gets rendered with border around table', () => {
    const { container } = render(<DefaultTable />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('BasicTable no border around table element', () => {
    const { container } = render(<BasicTable />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('StripedTable alternates background color on rows', () => {
    const { container } = render(<StripedTable />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('CompactTable smaller paddings and font size', () => {
    const { container } = render(<CompactTable />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
