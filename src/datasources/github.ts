import { RESTDataSource } from '@apollo/datasource-rest';
import { CurrentGithubUser } from '../interfaces';
import argon2 from 'argon2';
import UserModel from "../models/User";
import jwt from'jsonwebtoken';

const SECRET = process.env.SECRET
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

  async GithubUserSave (githubUser) {
    const hashed_password = await argon2.hash(`${githubUser.name}currentGithubUser1234`);
    const user = await UserModel.create({
      name: githubUser.name ? githubUser.name : githubUser.login,
      email: `${githubUser.name}2@gmail.com`,
      password: hashed_password,
      github: {
        ...githubUser
      }
    })
    console.log('user saved', user)
    const token = jwt.sign(
      { data: { userId: user._id, email: user.email } },
      SECRET,
      { expiresIn: "1h" }
    );
    return {
      user,
      token
    };
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
      const {user, token} = await this.GithubUserSave(githubUser)
      return {user, token};
    } catch(err) {
      console.log('requestGithubUser', err)
    }
  };
}