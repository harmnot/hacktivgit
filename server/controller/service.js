const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const CLIENT_ID =
  "657859657556-8ogc9qpr4meddjro28bqju2b1qbnld48.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
//model
const GitUser = require("../model/hacktivgit");
// axios instance
const goAxios = axios.create({
  baseURL: "https://api.github.com"
});

goAxios.defaults.headers.common["Authorization"] = `token ${
  process.env.TOKEN_GITHUB
}`;

class Controller {
  static async sigin(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.idToken,
        audience: CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      const userid = payload["sub"];
      const isUser = await GitUser.findOne({ email: payload.email });

      if (!isUser) {
        const createdUser = await GitUser.create({
          email: payload.email,
          name: payload.name,
          password: Math.floor(Math.random() * 120000000) + 1223777
        });
        jwt.sign(
          { email: payload.email, name: payload.name },
          process.env.SECRET_KEY,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.status(202).json(token);
          }
        );
      } else {
        jwt.sign(
          { email: payload.email, name: payload.name },
          process.env.SECRET_KEY,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.status(202).json(token);
          }
        );
      }
    } catch (err) {
      console.log(err, "ini errpr sigin google");
      next(err);
    }
  }

  static async findUser(req, res, next) {
    try {
      const { data } = await goAxios.get(
        `/search/users?q=${req.params.userName}`
      );
      res.status(302).json(data);
      return data;
    } catch (err) {
      next(err);
    }
  }
  static async findStrarredList(req, res, next) {
    try {
      const { data } = await goAxios.get(`/users/${req.params.user}/starred`);
      res.status(302).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async user(req, res, next) {
    try {
      const { data } = await goAxios.get(`/user`);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async createRepo(req, res, next) {
    try {
      const { data } = await goAxios.post(`/user/repos`, {
        name: req.body.repoName
      });
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async destroyRepo(req, res, next) {
    try {
      const { data } = await goAxios.delete(
        `/repos/${req.params.owner}/${req.params.repoName}`
      );
      res.status(200).json();
    } catch (err) {
      next(err);
    }
  }

  static async destroyStarredRepo(req, res, next) {
    try {
      const { data } = await goAxios.delete(
        `/user/starred/${req.params.owner}/${req.params.repoName}`
      );
      res.status(200).json();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
