import edit from './pencil.svg';

const btn = {
  backgroundColor: '#128fdc',
  color: '#fff',
  padding: [4, 20],
  borderRadius: 4,
  userSelect: 'none',
  boxShadow: '0 0 4px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24)',
  '&:active': {
    backgroundColor: '#0e74b3',
    boxShadow: 'none',
  },
};
export default {
  btnGroup: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: [20, 0],
  },
  counter: {
    whiteSpace: 'nowrap',
  },
  btnNext: {
    extend: [btn],
  },
  btnFlip: {
    extend: [btn],
  },
  edit: {
    position: 'absolute',
    display: 'inline-block',
    right: 15,
    top: 15,
    width: 25,
    height: 25,
    background: {
      image: `url("${edit}")`,
      size: 'contain',
    },
  },
};
