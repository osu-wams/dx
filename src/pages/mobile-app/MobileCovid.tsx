import React from 'react';
import { faListAlt } from '@fortawesome/pro-light-svg-icons';
import { MainGridWrapper, Masonry } from 'src/ui/grid';
import { Card, CardContent, CardFooter, CardHeader, CardIcon } from 'src/ui/Card';
import PageTitle from 'src/ui/PageTitle';
import { ExternalLink } from 'src/ui/Link';

const MobileCovid = () => {
  return (
    <MainGridWrapper>
      <PageTitle title="COVID-19" />
      <Masonry>
        <Card collapsing={false}>
          <CardContent>
            <p>
              You have not yet received a test for COVID-19. In order to access some buildings on
              campus, you must show proof of a negative COVID-19 test.
            </p>
          </CardContent>
          <CardFooter>
            <ExternalLink href="#ChangeMeSoon">Schedule a free test</ExternalLink>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader title="Past Results" badge={<CardIcon icon={faListAlt} />} />
          <CardContent>Past result would show up here.</CardContent>
        </Card>
      </Masonry>
    </MainGridWrapper>
  );
};

export default MobileCovid;
