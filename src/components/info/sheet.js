export default {
  info: {
    fontSize: 14,
    textAlign: 'center',
    color: '#5b5b5b',
    display: 'flex',
    justifyContent: 'space-between',
    whiteSpace: 'nowrap',
    padding: [5, 10],
    '& *': {
      display: 'inline-block',
      margin: [0, 2],
    },
    '& dd': {
      color: '#0e74b3',
    },
  },
  set: {
    fontWeight: 600,
    color: '#333',
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
};
