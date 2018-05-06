import arrow from './arrow-left.svg';
import pin from './office-push-pin.svg';
import grinPin from './green-pin.svg';
// #3ddd73
const btn = {
  display: 'inline-block',
  height: 30,
  width: 30,

  background: {
    size: 'contain',
    repeat: 'no-repeat',
    position: 'center',
  },
};

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
  prev: {
    extend: [btn],
    backgroundImage: `url("${arrow}")`,
  },
  next: {
    extend: [btn],
    backgroundImage: `url("${arrow}")`,
    transform: 'rotate(180deg)',
  },
  remember: {
    width: 50,
    height: 50,
    flex: [0, 0, '50px'],
    position: 'relative',
    '& > span': {
      position: 'absolute',
      willChange: 'transform',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      margin: 'auto',
      transition: '0.3s transform, opacity',
    },
  },
  greenPin: {
    extend: [btn],
    backgroundImage: `url("${grinPin}")`,
    transform: ({ isRemembered }) => (isRemembered ? 'rotate(-45deg)' : 'rotate(0deg)'),
  },
  whitePin: {
    extend: [btn],
    backgroundImage: `url("${pin}")`,
    transform: ({ isRemembered }) => (isRemembered ? 'rotate(-45deg)' : 'rotate(0deg)'),
    opacity: ({ isRemembered }) => (isRemembered ? 0 : 1),
  },
  disabled: {
    opacity: 0.5,
  },
};
