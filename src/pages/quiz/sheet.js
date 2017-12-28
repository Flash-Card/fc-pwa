const btn = {
  backgroundColor: '#128fdc',
  color: '#fff',
  padding: [4, 20],
  borderRadius: 4,
  '&:active': {
    backgroundColor: '#0e74b3',
  },
};

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
    ...btn,
  },
  btnFlip: {
    ...btn,
  },
};
