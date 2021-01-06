import React from 'react';
import ReactGA from 'react-ga';
import { CloseButton } from 'src/ui/Button';
import { LeadText, Description } from 'src/ui/Text';
import { Types } from '@osu-wams/lib';
import MyDialog, {
  MyDialogFooter,
  MyDialogContent,
  MyDialogHeader,
  MyDialogImage,
} from 'src/ui/MyDialog';
import { Event } from 'src/util/gaTracking';
import { ExternalLink } from 'src/ui/Link';
import { TwoCol } from 'src/ui/Grids';
import { commaList } from 'src/util/helpers';

const TrainingDetails: React.FC<any> = ({
  training,
  isOpen,
  toggleTraining,
}: {
  training: Types.Training;
  isOpen: boolean;
  toggleTraining: any;
}) => {
  const empty = 'Not available';

  // Images are flush with the top of the DialogHeader
  // Adds the padding when there is no image the <h2> has appropriate space
  const margin = !training.image ? { paddingTop: '1.5rem' } : {};

  return (
    <MyDialog
      padding="false"
      isOpen={isOpen}
      onDismiss={() => toggleTraining()}
      aria-labelledby="training-title"
    >
      {ReactGA.modalview('/training/training-details')}
      {training.image && (
        <div style={{ position: 'relative' }}>
          <MyDialogImage src={training.image} alt="" />
          <CloseButton
            onClick={toggleTraining}
            style={{
              position: 'absolute',
              margin: '0',
              top: '6px',
              right: '6px',
              background: 'rgba(0,0,0,.7)',
              borderRadius: '50%',
              padding: '4px 12px',
            }}
          />
        </div>
      )}
      <MyDialogHeader style={margin}>
        {!training.image && <CloseButton onClick={toggleTraining} />}
        <h2>{training.title}</h2>
      </MyDialogHeader>
      <MyDialogContent style={{ display: 'block' }}>
        <div dangerouslySetInnerHTML={{ __html: training.body! }} />
        <TwoCol>
          <div>
            <LeadText>Delivery Method</LeadText>
            <Description>{training.courseDesign ? training.courseDesign : empty}</Description>

            <LeadText>Offered by</LeadText>
            <Description>{training.department ? training.department : empty}</Description>

            <LeadText>Course length</LeadText>
            <Description>{training.courseLength ? training.courseLength : empty}</Description>
          </div>

          <div>
            <LeadText>Prerequisites</LeadText>
            <Description>{training.prerequisites ? training.prerequisites : empty}</Description>

            <LeadText>Audience</LeadText>
            <Description>{commaList(training.audiences, empty)}</Description>

            <LeadText>Cost</LeadText>
            <Description>{training.cost ? 'Yes' : 'No cost'}</Description>
          </div>
        </TwoCol>
      </MyDialogContent>
      <MyDialogFooter>
        {training.websiteUri ? (
          <ExternalLink
            href={training.websiteUri}
            onClick={() => Event('training', `website link: ${training.websiteUri}`)}
          >
            Learn more and register
          </ExternalLink>
        ) : (
          <>
            {training.contact && (
              <ExternalLink
                href={`mailto:${training.contact}`}
                onClick={() => Event('training', `contact mailto link: ${training.contact}`)}
              >
                Contact: {training.contact}
              </ExternalLink>
            )}
          </>
        )}
      </MyDialogFooter>
    </MyDialog>
  );
};

export { TrainingDetails };
