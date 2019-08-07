import React from 'react';
import { render } from '@testing-library/react';
import PageGrid from '../PageGrid';

const Standard = () => (
  <PageGrid>
    <div>Left column desktop</div>
    <div>Right column desktop</div>
  </PageGrid>
);

const RowSpan1 = () => (
  <PageGrid>
    <div>Left column desktop</div>
    <div className="row-span-1">Right column desktop</div>
  </PageGrid>
);

const RowSpan2 = () => (
  <PageGrid>
    <div>Left column desktop</div>
    <div className="row-span-2">Right column desktop</div>
  </PageGrid>
);

const RowSpan4 = () => (
  <PageGrid>
    <div>Left column desktop</div>
    <div className="row-span-4">Right column desktop</div>
  </PageGrid>
);

const RowSpan5 = () => (
  <PageGrid>
    <div>Left column desktop</div>
    <div className="row-span-5">Right column desktop</div>
  </PageGrid>
);

const ColSpan2 = () => (
  <PageGrid>
    <div>Left column desktop</div>
    <div>Right column desktop</div>
    <div className="col-span-1">Span both columns desktop</div>
  </PageGrid>
);

const MixSpans = () => (
  <PageGrid>
    <div className="row-span-2">Left column desktop</div>
    <div className="row-span-4">Right column desktop</div>
    <div className="col-span-1">Span both columns desktop</div>
  </PageGrid>
);

test('Standard equal size columns', () => {
  const { container } = render(<Standard />);
  expect(container).toMatchSnapshot();
});

test('Right Column row height only 1/3', () => {
  const { container } = render(<RowSpan1 />);
  expect(container).toMatchSnapshot();
});

test('Right Column row height only 2/3', () => {
  const { container } = render(<RowSpan2 />);
  expect(container).toMatchSnapshot();
});

test('Right Column row height now spans 4/3', () => {
  const { container } = render(<RowSpan4 />);
  expect(container).toMatchSnapshot();
});

test('Right Column row height now spans 5/3', () => {
  const { container } = render(<RowSpan5 />);
  expect(container).toMatchSnapshot();
});

test('Third div now spans both columns, making it a single column', () => {
  const { container } = render(<ColSpan2 />);
  expect(container).toMatchSnapshot();
});

test('Columns and Rows with different properties', () => {
  const { container } = render(<MixSpans />);
  expect(container).toMatchSnapshot();
});
