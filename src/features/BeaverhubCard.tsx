import React from 'react';
import { faGlobe } from '@fortawesome/pro-light-svg-icons';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardIcon,
} from '../ui/Card';
import { ExternalLink, InternalLink } from '../ui/Link';
import Button from 'src/ui/Button';

export const BeaverhubCard = () => {

  return (
    <div style={{width: "50%", marginLeft: "auto", marginRight: "auto"}}>
      <Card collapsing={false}>
        <CardHeader title="Your OSU Student Portal Has Moved" badge={<CardIcon icon={faGlobe} />} />
        <CardContent>
        The student experience in MyOregonState has moved to Beaver Hub. Click the button below to learn more about the new features available to you.
        If you are a student employee, you can still access employee-related tools and resources by selecting &apos;Employee Dashboard&apos; from the dropdown above.
        </CardContent>
        <CardFooter infoButtonId="beaverhub-card">
          <Button btnSize='large' style={{width: "100%"}}>
            <ExternalLink target="_self"
              href="https://beaverhub.oregonstate.edu/s/landing"
              fg="white"
            >
              Proceed to Beaver Hub
            </ExternalLink>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BeaverhubCard;
