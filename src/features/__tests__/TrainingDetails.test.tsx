import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithAllContexts as render } from 'src/util/test-utils';
import userEvent from '@testing-library/user-event';
import { TrainingDetails } from 'src/features/training/TrainingDetails';
import { mockGAEvent } from 'src/setupTests';
import { Trainings } from '@osu-wams/hooks';

const emptyItem = {
  audiences: [],
  id: '1',
  title: 'Title EmptyItem',
  image: '',
  contact: '',
  cost: false,
  body: "<p>Training Body, you'll learn how to play nice with others.</p>",
  offeredBy: '',
  courseLength: '',
  featured: false,
  frequency: '',
  prerequisites: '',
  deliveryMethod: [],
  tags: [],
  websiteUri: '',
  websiteTitle: '',
};

const emptyWebsite = { ...Trainings.mockTrainings.data[0], websiteUri: '' };

/**
 * Featured with empty image, shows no image
 * empty title and website shows nothing in footer
 * empty data shows not available
 * contact and no wbesite shows contact
 */

it('Renders all the data', () => {
  render(<TrainingDetails training={Trainings.mockTrainings.data[0]} />);
  // Title
  expect(screen.getByRole('heading', { name: 'Play nice with others' })).toBeInTheDocument();

  // Audience exploded array
  expect(screen.getByText(/Academic Faculty, Professional Faculty, Student/i)).toBeInTheDocument();

  // offeredBy
  expect(screen.getByText('Daycare')).toBeInTheDocument();

  // DeliveryMethod
  expect(screen.getByText('Online, Blended')).toBeInTheDocument();

  //Prerequisites
  expect(screen.getByText('None')).toBeInTheDocument();

  //Course Length
  expect(screen.getByText('Full day')).toBeInTheDocument();

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
  render(<TrainingDetails training={Trainings.mockTrainings.data[0]} />);
  const website = screen.getByText('Learn more and register');
  expect(website).toBeInTheDocument();

  userEvent.click(website);
  expect(mockGAEvent).toHaveBeenCalledTimes(1);
});

it('Renders contact email when website url is blank', () => {
  render(<TrainingDetails training={emptyWebsite} />);
  expect(screen.queryByText('Learn more and register')).not.toBeInTheDocument();
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

  expect(screen.queryByText('Learn more and register')).not.toBeInTheDocument();
  expect(screen.queryByText(/Contact:/i)).not.toBeInTheDocument();
});
