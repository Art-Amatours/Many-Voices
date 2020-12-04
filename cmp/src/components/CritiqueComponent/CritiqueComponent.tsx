import React, { useState } from 'react';
import './styles.css';
import { Critique } from '../../store/artwork/types';
import CritiqueEdit from '../CritiqueEdit/CritiqueEdit';
import CritiqueView from '../CritiqueView/CritiqueView';

interface Props {
  critique?: Critique | null;
  setCritique: (critique: Critique) => void;
}

const CritiqueComponent: React.FC<Props> = (props: Props) => {
  let critiqueView;
  // =
  //   <CritiqueView critique={critique} />,
  // );
  const [isEdit, setIsEdit] = useState(false);

  if (isEdit) {
    critiqueView = (
      <CritiqueEdit
        critique={props.critique}
        setCritique={(crit: Critique) => {
          setIsEdit(false);
          props.setCritique(crit);
        }}
      />
    );
  } else {
    critiqueView = (
      <div
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault();
          setIsEdit(true);
        }}
        onKeyDown={(e) => {
          e.preventDefault();
          setIsEdit(true);
        }}>
        <CritiqueView critique={props.critique} />
      </div>
    );
  }

  return critiqueView;
};

CritiqueComponent.defaultProps = {
  critique: null,
};

export default CritiqueComponent;
