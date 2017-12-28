export default {
  create: {
    padding: 10,
    position: 'relative',
  },
  fields: {
    fontSize: 16,
    width: '100%',
    margin: [8, 0, 12],
    padding: [3, 8],
    border: '0 none',
    borderBottom: '1px solid #cfd2d5',
    boxShadow: 'none',
    '&:focus': {
      borderBottomColor: '#128fdc',
    },
  },
  key: {
    height: 35,
  },
  value: {
    resize: 'none',
    height: 70,
  },
  label: {
    lineHeight: 1.4,
    fontSize: 14,
    color: '#333',
    verticalAlign: 'middle',
    '& > span': {
      marginLeft: 8,
    }
  },
  submit: {
    width: '100%',
    margin: [14, 'auto'],
    display: 'block',
    height: 35,
    borderRadius: 3,
    background: '#128fdc',
    color: '#fff',
    fontSize: 16,
    fontWeight: 600,
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24)',
  },
};
