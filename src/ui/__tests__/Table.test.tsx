import React from 'react';
import { render } from '../../util/test-utils';
import { Table, TableBody, TableRow, TableCell } from '../Table';

const DefaultTable = () => (
  <Table variant="default">
    <caption>Default Table</caption>
    <TableBody>
      <TableRow>
        <TableCell>One col</TableCell>
        <TableCell>Two col</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

const BasicTable = () => (
  <Table variant="basic">
    <caption>Basic Table</caption>
    <TableBody>
      <TableRow>
        <TableCell>One col</TableCell>
        <TableCell>Two col</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

const CompactTable = () => (
  <Table variant="compact">
    <caption>Compact Table</caption>
    <TableBody>
      <TableRow>
        <TableCell>One col</TableCell>
        <TableCell>Two col</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

const StripedTable = () => (
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
);

const StretchTable = () => (
  <Table variant="basic" stretch>
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
);

describe('<Table />', () => {
  test('DefaultTable gets rendered with border around table', () => {
    const { container } = render(<DefaultTable />);
    expect(container).toMatchSnapshot();
  });

  test('BasicTable no border around table element', () => {
    const { container } = render(<BasicTable />);
    expect(container).toMatchSnapshot();
  });

  test('StripedTable alternates background color on rows', () => {
    const { container } = render(<StripedTable />);
    expect(container).toMatchSnapshot();
  });

  test('CompactTable smaller paddings and font size', () => {
    const { container } = render(<CompactTable />);
    expect(container).toMatchSnapshot();
  });

  test('Stetch table gets 100% width', () => {
    const { container } = render(<StretchTable />);
    expect(container).toMatchSnapshot();
  });
});
