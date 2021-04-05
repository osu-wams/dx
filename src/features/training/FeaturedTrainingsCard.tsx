import React, { useState, useEffect } from 'react';
import { faUsersClass } from '@fortawesome/pro-light-svg-icons';
import { Types } from '@osu-wams/lib';
import { Loading } from 'src/ui/Loading';
import { Card, CardHeader, CardContent, CardFooter, CardIcon } from 'src/ui/Card';
import { InternalLink } from 'src/ui/Link';
import { TrainingDetails } from './TrainingDetails';
import { Event } from 'src/util/gaTracking';

import {
  FeatureCardCompact,
  FeatureCardHeader,
  FeatureCardContent,
} from 'src/ui/Card/variants/FeatureCard';
import { useRecoilValue } from 'recoil';
import { trainingState } from 'src/state';
import { Routes } from 'src/routers';

const FeaturedTrainingsCard = () => {
  const { data, isSuccess, isLoading } = useRecoilValue(trainingState);
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
    if (isSuccess && data && data.length > 0) {
      // Just return the Featured Trainings
      const featured = data.filter((t) => {
        return t.featured === true;
      });

      featured.length && setFeaturedTrainings(featured);
    }
  }, [data, isSuccess]);

  return (
    <Card>
      <CardHeader title="Featured Trainings" badge={<CardIcon icon={faUsersClass} />} />
      <CardContent>
        {isLoading && <Loading lines={5} />}

        {isSuccess && featuredTrainings.length > 0 ? (
          <>
            {featuredTrainings.map((t) => (
              <FeatureCardCompact
                key={t.id}
                onClick={() => {
                  toggleTraining(t);
                  Event('training-featured', 'training opened', t.title);
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
              >
                <FeatureCardHeader style={{ paddingTop: 0 }}>{t.title}</FeatureCardHeader>
                {t.body && <FeatureCardContent dangerouslySetInnerHTML={{ __html: t.body }} />}
              </FeatureCardCompact>
            ))}

            {isOpen && selectedTraining && (
              <TrainingDetails training={selectedTraining} isOpen toggleTraining={toggleTraining} />
            )}
          </>
        ) : (
          isLoading && <div>No featured resources available</div>
        )}
      </CardContent>
      <CardFooter>
        <InternalLink
          to={Routes().trainings.fullPath}
          onClick={() => Event('training-featured', 'View more trainings')}
        >
          View more trainings
        </InternalLink>
      </CardFooter>
    </Card>
  );
};

export { FeaturedTrainingsCard };
