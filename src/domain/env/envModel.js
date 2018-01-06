import I from 'immutable';

const Env = new I.fromJS({
  isAuthorized: false,
  gitHub: {
    url: 'https://github.com/login/oauth/authorize',
    client_id: 'a08c8e7509caa2da1f2a',
    redirect_uri: 'https://flash-card.github.io/fc-pwa/#/auth-cb',
    state: '1234',
    allow_signup: true,
  },
});

export const reducer = {
  env(state = Env, action) {
    switch (action.type) {

      default:
        return state;
    }
  },
};
