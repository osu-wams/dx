import React, { useEffect, useState, useContext } from 'react';
import ReactGA from 'react-ga';
import styled from 'styled-components/macro';
import { useDebounce } from 'use-debounce';
import { spacing, MainGridWrapper, breakpoints, fontSize, MainGrid } from 'src/theme';
import { CloseButton } from 'src/ui/Button';
import { LeadText, Description } from 'src/ui/Text';
import MyDialog, {
  MyDialogFooter,
  MyDialogContent,
  MyDialogHeader,
  MyDialogImage,
} from 'src/ui/MyDialog';
import { formatTime, format, singularPlural } from 'src/util/helpers';
import Divider from 'src/ui/Divider';
import { ExternalLink } from 'src/ui/Link';
import { TwoCol } from 'src/ui/Grids';

const TrainingDetails: React.FC<any> = ({ training, isOpen, toggleTraining }) => {
  return (
    <MyDialog
      padding="false"
      isOpen={isOpen}
      onDismiss={() => toggleTraining()}
      aria-labelledby="training-title"
    >
      {ReactGA.modalview('/training/training-details')}
      {training.image && <MyDialogImage src={training.image} alt="" />}
      <MyDialogHeader>
        <CloseButton onClick={toggleTraining} />

        <h2>{training.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: training.body }} />
      </MyDialogHeader>
      <MyDialogContent>
        <TwoCol>
          <div>
            <LeadText>Level of Learning</LeadText>

            <Description>{training.title}</Description>

            <LeadText>Department</LeadText>
            <Description>{training.department}</Description>

            <LeadText>Course Type</LeadText>
            <Description>{training.type}</Description>

            <LeadText>Course Design</LeadText>
            <Description>{training.courseDesign}</Description>
          </div>

          <div>
            <LeadText>Prerequisites</LeadText>
            <Description>{training.prerequisites}</Description>

            <LeadText>Audience</LeadText>
            <Description>
              {training.audiences.map((a, index) => (
                <span key={index}>{(index ? ', ' : '') + a}</span>
              ))}
            </Description>

            <LeadText>Cost</LeadText>
            <Description>{training.cost ? 'Yes' : 'No cost'}</Description>
          </div>
        </TwoCol>
      </MyDialogContent>
      <MyDialogFooter>
        {training.websiteUri ? (
          <ExternalLink
            href={training.websiteUri}
            // onClick={() => Event('training', 'view courses clicked')}
          >
            Learn more and register
          </ExternalLink>
        ) : (
          training.contact
        )}
      </MyDialogFooter>
    </MyDialog>
  );
};

export { TrainingDetails };
