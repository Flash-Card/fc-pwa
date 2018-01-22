export default {
  searchInput: {
    width: '100%',
  },
  searchIcon: {
    maxWidth: 20,
    flexGrow: 1,
    cursor: 'pointer',
    margin: [0, 10],
  },
  searchWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  search: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    zIndex: 2,
    width: 40,
    transition: '.3s width',
    '&.open': {
      background: 'rgba(21,21,23,.95)',
      width: '100%',
    },
  },
  closeSearch: {
    margin: [0, 10],
  },
  inputWrapper: {
    width: '100%',
    position: 'relative',
  },
  dropDown: {
    padding: [10, 5],
    backgroundColor: '#fff',
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24)',
    position: 'absolute',
    top: 22,
    right: 0,
    left: 0,
    '& li': {
      padding: 5,
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: 'rgba(0, 0, 0, 0.24)',
      },
    },
  },
  itemDropDown: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  setWord: {
    fontSize: 10,
  },
};
