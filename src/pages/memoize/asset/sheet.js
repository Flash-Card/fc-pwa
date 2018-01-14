import download from './cloud-download.svg';

export default {
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 600,
  },
  set: {
    borderBottom: '1px solid #e5e5e5',
    position: 'relative',
  },
  text: {
    fontSize: 14,
  },
  btnGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: [10, 0],
  },
  download: {
    width: 30,
    height: 30,
    disable: 'inline-block',
    margin: [0, 20],
    background: {
      image: `url("${download}")`,
      size: 'contain',
      repeat: 'no-repeat',
      position: 'center',
    },
    '&[disabled]': {
      filter: 'grayscale(100%)',
      opacity: 0.5,
    },
  },
  bar: {
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    height: 8,
    background: '#128edc',
    transform: ({ data }) => `translate3d(-${100 - data.get('progress', 0)}%, 0, 0)`,
    transition: '0.3s transform',
  },
};

// background: ({ progress }) => `linear-gradient(to right, rgba(18,143,220,0.5) 0%, rgba(18,143,220,0.5) ${progress}%, transparent ${progress}%, transparent 100%)`,
