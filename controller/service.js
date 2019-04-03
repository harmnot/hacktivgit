const axios = require("axios");
const goAxios = axios.create({
  baseURL: "https://api.github.com"
});

goAxios.defaults.headers.common["Authorization"] = `token ${
  process.env.TOKEN_GITHUB
}`;

class Controller {
  static async findUser(req, res, next) {
    try {
      const { data } = await goAxios.get(
        `/search/users?q=${req.params.userName}`
      );
      res.status(302).json(data);
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
