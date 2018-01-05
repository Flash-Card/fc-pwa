import up from './thumbs-up.svg';
import flip from './arrows.svg';
import arrow from './arrow-left.svg';

export default {
  quiz: {
    padding: 10,
  },
  btnGroup: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: [20, 0],
  },
  btnNext: {
    backgroundImage: `url(${arrow})`,
    transform: 'rotate(180deg)',
  },
  btnOk: {
    backgroundImage: `url(${up})`,
  },
  btnFlip: {
    backgroundImage: `url(${flip})`,
  },
  title: {
    fontSize: 24,
    margin: [20, 0],
    textAlign: 'center',
  },
};
