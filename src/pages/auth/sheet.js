import git from './github-logo.svg';

export default {
  title: {
    textAlign: 'center',
    fontSize: 22,
  },
  git: {
    width: '100%',
    height: 50,
    background: '#128fdc',
    color: '#fff',
    position: 'relative',
    borderRadius: 4,
    fontSize: 20,
    textDecoration: 'none',
    display: 'block',
    textAlign: 'center',
    lineHeight: '50px',
    '&:before': {
      content: '""',
      display: 'inline-block',
      verticalAlign: 'middle',
      background: `url("${git}") scroll no-repeat center / contain`,
      width: 35,
      height: 35,
      position: 'absolute',
      left: 20,
      top: 0,
      bottom: 0,
      margin: 'auto',
    },
  },
};
