export default {
  sidebar: {
    background: 'rgba(0, 0, 0, 0.8)',
    height: 60,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& > *': {
      flex: [0, 0, '25%'],
      textAlign: 'center',
    },
  },
};
