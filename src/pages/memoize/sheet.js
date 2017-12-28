import download from './cloud-download.svg';
export default {
  btn: {
    fontSize: 18,
    padding: [0, 8],
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
  set: {
    borderBottom: '1px solid #e5e5e5',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
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
};
