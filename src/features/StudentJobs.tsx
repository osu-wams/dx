import React, { useEffect, useState } from 'react';
import { Color } from '../theme';
import { faArrowRight, faChevronRight } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardFooter, Badge } from '../ui/Card';
import Icon from '../ui/Icon';
import { getJobs, IJobs } from '../api/jobs';
import {
  List,
  ListItem,
  ListItemContent,
  ListItemDescription,
  ListItemHeader,
  ListItemText
} from '../ui/List';
import Button from '../ui/Button';
import { ExternalLink } from '../ui/Link';
import Url from '../util/externalUrls.data';

const StudentJobs: React.FC = () => {
  const [jobs, setJobs] = useState<IJobs[]>([]);
  const openUrl = (id: number) => {
    const url = 'https://oregonstate.joinhandshake.com/jobs/' + id;
    window.open(url, '_blank');
  };

  useEffect(() => {
    getJobs()
      .then(res => {
        setJobs(res.jobs);
      })
      .catch(console.log);
  }, []);
  return (
    <Card>
      <CardHeader
        title="Jobs in Corvallis"
        badge={<Badge bg={Color['pine-400']}>{jobs.length >= 5 ? 5 : jobs.length}</Badge>}
      />
      <CardContent>
        {jobs.length ? (
          <List>
            {jobs.slice(0, 5).map(job => (
              <ListItem key={job.id} onClick={() => openUrl(job.id)}>
                <ListItemContent>
                  <ListItemText>
                    <ListItemHeader>{job.title}</ListItemHeader>
                    <ListItemDescription>
                      {job.employer.name} {job.employer.location.city}
                    </ListItemDescription>
                  </ListItemText>
                  <Icon icon={faChevronRight} color={Color['pine-400']} />
                </ListItemContent>
              </ListItem>
            ))}
          </List>
        ) : (
          <p>No jobs at this time</p>
        )}
      </CardContent>
      <CardFooter>
        <ExternalLink fg={Color['pine-400']} href={Url.handshake.postings}>
          View all jobs in Handshake
        </ExternalLink>
      </CardFooter>
    </Card>
  );
};

export default StudentJobs;
