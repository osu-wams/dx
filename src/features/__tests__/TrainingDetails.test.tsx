import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'src/util/test-utils';
import userEvent from '@testing-library/user-event';
import { TrainingDetails } from 'src/features/training/TrainingDetails';
import { mockGAEvent } from 'src/setupTests';

const fullItem = {
  audiences: ['Academic Faculty', 'Professional Faculty', 'Staff', 'Students'],
  id: '71560c56-dabb-48e1-a663-64da7a7bb6e8',
  title: 'Play nice with others',
  image: 'WellnessNook.jpg',
  contact: 'noreply@oregonstate.edu',
  cost: true,
  body: '<p>In this basic course...</p>',
  department: 'Daycare',
  duration: '1hr',
  featured: true,
  frequency: 'Daily',
  prerequisites: 'None',
  courseDesign: 'Blended',
  tags: ['Employee Engagement'],
  type: 'Professional Learning Community',
  websiteUri: 'https://oregonstate.edu',
  websiteTitle: '',
};

const emptyItem = {
  audiences: [],
  id: '1',
  title: 'Title EmptyItem',
  image: '',
  contact: '',
  cost: false,
  body: "<p>Training Body, you'll learn how to play nice with others.</p>",
  department: '',
  duration: '',
  featured: false,
  frequency: '',
  prerequisites: '',
  courseDesign: '',
  tags: [],
  type: '',
  websiteUri: '',
  websiteTitle: '',
};

const emptyWebsite = { ...fullItem, websiteUri: '' };

/**
 * Featured with empty image, shows no image
 * empty title and website shows nothing in footer
 * empty data shows not available
 * contact and no wbesite shows contact
 */

it('Renders all the data', () => {
  render(<TrainingDetails training={fullItem} />);
  // Title
  expect(screen.getByRole('heading', { name: 'Play nice with others' })).toBeInTheDocument();

  // Audience exploded array
  expect(
    screen.getByText(/Academic Faculty, Professional Faculty, Staff, Students/i)
  ).toBeInTheDocument();

  // Department
  expect(screen.getByText('Daycare')).toBeInTheDocument();

  // Design
  expect(screen.getByText('Blended')).toBeInTheDocument();

  // Cost
  expect(screen.getByText('Yes')).toBeInTheDocument();

  // Website Uri
  const website = screen.getByText('Learn more and register');
  expect(website).toBeInTheDocument();
  const url = website.getAttribute('href');
  expect(url).toEqual('https://oregonstate.edu');

  // hero header image is present
  const images = document.querySelectorAll('img');
  expect(images.length).toEqual(1);
});

it('Link is present and triggers google analytics', () => {
  render(<TrainingDetails training={fullItem} />);
  const website = screen.getByText('Learn more and register');
  expect(website).toBeInTheDocument();

  userEvent.click(website);
  expect(mockGAEvent).toHaveBeenCalledTimes(1);
});

it('Renders contact email when website url is blank', () => {
  render(<TrainingDetails training={emptyWebsite} />);
  expect(screen.queryByText('Learn more and register')).toBeNull();
  const contact = screen.getByText(/Contact: noreply@oregonstate.edu/i);
  expect(contact).toBeInTheDocument();
  userEvent.click(contact);
  expect(mockGAEvent).toHaveBeenCalledTimes(1);
});

it('Renders "Not available" when fields are missing', () => {
  render(<TrainingDetails training={emptyItem} />);
  expect(screen.getByText('No cost')).toBeInTheDocument();

  expect(screen.getAllByText('Not available')).toHaveLength(5);

  const images = document.querySelectorAll('img');
  expect(images.length).toEqual(0);

  expect(screen.queryByText('Learn more and register')).toBeNull();
  expect(screen.queryByText(/Contact:/i)).toBeNull();
});
