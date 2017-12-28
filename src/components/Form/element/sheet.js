export default  {
  addBtn: {
    backgroundColor: '#128fdc',
    width: 30,
    height: 30,
    flex: [0, 0, '30px'],
    color: '#fff',
    alignSelf: 'flex-end',
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24)',
  },
  container: {
    display: 'flex',
  },
  list: {
    flex: [1, 1, '90%'],
    paddingRight: 15,
    '& > li:not(:first-child)': {
      marginTop: 15,
    },
  },
  fieldWrapper: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 3,
    color: '#333',
    display: 'inline-block',
  },
  field: {
    width: '100%',
    height: 30,
    background: '#fff',
    borderRadius: 5,
    border: '1px solid #e5e9f2',
    padding: [0, 8],
  },
  item: {
    borderBottom: '1px solid #c0c0c0',
    paddingBottom: 12,
    '& > *:not(:first-child)': {
      marginTop: 12,
    },
  },
};
