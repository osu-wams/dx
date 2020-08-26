import React, { useState, useEffect } from 'react';
import { faUsersClass } from '@fortawesome/pro-light-svg-icons';
import { Types } from '@osu-wams/lib';
import { Loading } from 'src/ui/Loading';
import { Card, CardHeader, CardContent, CardFooter, CardIcon } from 'src/ui/Card';
import { InternalLink } from 'src/ui/Link';
import { useTrainings } from '@osu-wams/hooks';
import { TrainingDetails } from './TrainingDetails';
import { Event } from 'src/util/gaTracking';

import {
  FeatureCard,
  FeatureCardHeader,
  FeatureCardContentCompact,
} from 'src/ui/Card/variants/FeatureCard';

const FeaturedTrainingsCard = () => {
  const trainings = useTrainings();
  const [isOpen, setOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [featuredTrainings, setFeaturedTrainings] = useState<Types.Training[]>([]);

  // Hides or shows course details
  const toggleTraining = (t?) => {
    setOpen(!isOpen);
    if (t) {
      setSelectedTraining(t);
    }
  };

  useEffect(() => {
    if (trainings.isSuccess && trainings.data.length > 0) {
      // Nobody has searched, so it's page load or tag click
      const featured = trainings.data.filter((t) => {
        return t.featured === true;
      });
      console.log(featured);
      featured.length && setFeaturedTrainings(featured);
    }
  }, [trainings.data, trainings.isSuccess]);

  return (
    <Card>
      <CardHeader title="Featured Training" badge={<CardIcon icon={faUsersClass} />} />
      <CardContent>
        {trainings.isLoading && <Loading lines={5} />}

        {trainings.isSuccess && featuredTrainings.length > 0 ? (
          <>
            {featuredTrainings.map((t) => (
              <FeatureCard
                key={t.id}
                onClick={() => {
                  toggleTraining(t);
                  Event('training-featured', 'training opened', t.title);
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                style={{ marginBottom: 0 }}
              >
                <FeatureCardHeader style={{ paddingTop: 0 }}>{t.title}</FeatureCardHeader>
                {t.body && (
                  <FeatureCardContentCompact dangerouslySetInnerHTML={{ __html: t.body }} />
                )}
              </FeatureCard>
            ))}

            {isOpen && selectedTraining && (
              <TrainingDetails training={selectedTraining} isOpen toggleTraining={toggleTraining} />
            )}
          </>
        ) : (
          !trainings.isLoading && <div>No featured resources available</div>
        )}
      </CardContent>
      <CardFooter>
        <InternalLink
          to="/training"
          onClick={() => Event('training-featured', 'View more trainings')}
        >
          View more trainings
        </InternalLink>
      </CardFooter>
    </Card>
  );
};

export { FeaturedTrainingsCard };
