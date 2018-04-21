const output = (status, data, msg) => JSON.stringify({status: status, data: data, msg: msg})

const ensureToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.json({
        status: false,
        msg: '没有验证信息'
      })
      // res.sendStatus(403);
    }
  }

module.exports = {
  output: output,
  ensureToken: ensureToken
}



