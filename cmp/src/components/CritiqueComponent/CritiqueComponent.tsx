import React, { useState } from 'react';
import './styles.css';
import { Critique } from '../../store/artwork/types';
import CritiqueEdit from '../CritiqueEdit/CritiqueEdit';
import CritiqueView from '../CritiqueView/CritiqueView';

interface Props {
  critique?: Critique | null;
}

const CritiqueComponent: React.FC<Props> = (props: Props) => {
  const [critique, setCritique] = useState(props.critique);
  const [critiqueView, setCritiqueView] = useState(
    <CritiqueView critique={props.critique} />,
  );
  const [isEdit, setIsEdit] = useState(false);

  return (
    <button
      type="submit"
      onClick={(e) => {
        if (isEdit) {
          setCritiqueView(<CritiqueView critique={props.critique} />);
          setIsEdit(false);
        } else {
          setCritiqueView(
            <CritiqueEdit
              critique={props.critique}
              setCritique={setCritique}
            />,
          );
          setIsEdit(true);
        }
      }}>
      {critiqueView}
    </button>
  );
};

CritiqueComponent.defaultProps = {
  critique: null,
};

export default CritiqueComponent;
