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
    padding: [0, 15],
    '& > button': {
      flex: [0, 0, '25%'],
      textAlign: 'center',
      display: 'block',
      height: 30,
      width: 30,
      maxWidth: 30,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      transition: '0.5 opacity',
      '&:disabled': {
        opacity: 0.5,
      },
    },
  },
};
