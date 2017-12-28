import React from 'react';
import Stat from './stat';
import injectSheet from 'react-jss';
import sheet from './sheet.js';

function Home({ classes }){
  return (
    <div className={classes.home}>
      <Stat cards={0}/>
    </div>
  );
}

export default injectSheet(sheet)(Home);
