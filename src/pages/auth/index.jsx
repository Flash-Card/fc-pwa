import React from 'react';
import qs from 'query-string';
import nanoId from 'nanoid';

const PARAMS = {
  client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_GITHUB_REDIRECT_URL,
  scope: process.env.REACT_APP_GITHUB_SCOPE,
  allow_signup: process.env.REACT_APP_GITHUB_SIGN_UP,
  state: nanoId(10),
};

class AuthPage extends React.Component {

  search = parasm => Object.keys(parasm).reduce((a, v) => `${a}&${v}=${parasm[v]}`, '');

  render() {
    return (
      <div className="screen">
        <div className="inner">
          <div className="btn__group">
            <a
              href={`https://github.com/login/oauth/authorize?${qs.stringify(PARAMS)}`}
              className="btn btn_main"
            >Auth via GitHub
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthPage;
