import { FC, useCallback } from 'react';
import { IAnswer, IQuestion } from '../types';
import './styles.scss';

const list = (size: number) => [...Array(size).keys()];

interface IAnswerListProps {
  onSelect: (el: IAnswer) => void;
  suggestion: ReadonlyArray<IQuestion>;
}

export const AnswerList: FC<IAnswerListProps> = ({ onSelect, suggestion }) => {

  const handleClick = useCallback(
    (answer: string) => () => onSelect({ answer }),
    [onSelect],
  );

  return (
    <ul className="fc-answer-list">
      {
        list(suggestion.length).map((e) => 
          <li key={suggestion[e].answer} className="fc-answer-list__item">
            <button
              type="button"
              className="fc-answer-list__button"
              onClick={handleClick(suggestion[e].answer)}
            >{suggestion[e].answer}</button>
          </li>
        )
      }
    </ul>
  );
}
