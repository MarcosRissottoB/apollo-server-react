import { RESTDataSource } from '@apollo/datasource-rest';
import { CurrentGithubUser } from '../interfaces';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
const GITHUB_BASE_URL ='https://github.com'
const API_GITHUB = 'https://api.github.com';
const GITHUB_ENDPOINT_LOGIN = '/login/oauth'
const GITHUB_ENDPOINT_ACCESS_TOKEN = '/access_token';

const GITHUB_ENDPOINT_AUTHORIZE = '/authorize';

export class GithubAPI extends RESTDataSource {

  currentGithubUser: CurrentGithubUser

  async getGithubLoginUrl() {
    return `${GITHUB_BASE_URL}${GITHUB_ENDPOINT_LOGIN}${GITHUB_ENDPOINT_AUTHORIZE}?client_id=${ GITHUB_CLIENT_ID}&scope=user`;
  }

  async queryStringToJSON(qs) {
    let pairs = qs.split('&');
    let result = {};
    pairs.forEach(function(p) {
        let pair = p.split('=');
        let key = pair[0];
        let value = decodeURIComponent(pair[1] || '');

        if( result[key] ) {
          if( Object.prototype.toString.call( result[key] ) === '[object Array]' ) {
            result[key].push( value );
          } else {
            result[key] = [ result[key], value ];
          }
        } else {
          result[key] = value;
        }
    });
    return JSON.parse(JSON.stringify(result));
  };

  async requestGithubToken(credentials) {
    try {
      const response = await this.post(`${GITHUB_BASE_URL}${GITHUB_ENDPOINT_LOGIN}${GITHUB_ENDPOINT_ACCESS_TOKEN}`, 
        { body: (credentials) }, 
      );
      let responseJSON = await this.queryStringToJSON(response);
      return responseJSON;
    } catch(err) {
      console.log('requestGithubToken', err)
    }
  }

  async requestGithubUserAccount (token) {
    try {
      const response = await this.get(`${API_GITHUB}/user?access_token=${token}`,
        {headers: { Authorization: `Bearer ${token}`}}
      );
      return response;
    } catch(err) {
      console.log('requestGithubUserAccount', err)
    }
  }

  async requestGithubUser (code) {
    const credentials = {
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      ...code
    }
    try {
      const { access_token } = await this.requestGithubToken(credentials);
      const githubUser = await this.requestGithubUserAccount(access_token);
      this.currentGithubUser = {
        name: githubUser.name ? githubUser.name : githubUser.login,
        githubLogin: githubUser.login,
        githubToken: access_token,
        avatar: githubUser.avatar_url
      }
      return {user: this.currentGithubUser, token: access_token}
    } catch(err) {
      console.log('requestGithubUser', err)
    }
  };
}