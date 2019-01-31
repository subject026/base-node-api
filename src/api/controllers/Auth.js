const jwt = require('jsonwebtoken');

const getUser = (req, res) => {
  // is there a cookie with token
  if (req.cookies.token) {
    const token = jwt.verify(req.cookies.token, process.env.APP_SECRET);
    res.json({
      user: {
        isLoggedIn: true,
        name: token.user,
      },
    });
  } else {
    res.json({ user: { isLoggedIn: false } });
  }
};

const login = (req, res) => {
  console.log('login controller\n');
  console.log('req.body: ', req.body);
  // Look up user
  // Check username & password
  //    - Success : Sign jwt and add to cookie
  //    - failure : Send response advising login failed
  const existingToken = req.cookies.token;
  if (existingToken) {
    const verified = jwt.verify(existingToken, process.env.APP_SECRET);
    console.log(verified);
    return res.json({ data: 'Already logged in' });
  }
  console.log('No token, need to set one...');
  const token = jwt.sign({ user: 'thisIsUserId', role: 'ADMIN' }, process.env.APP_SECRET);
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
  });
  return res.json({ user: 'loggedInUser' });
};

const logout = (req, res) => {
  res.clearCookie('token');
  return res.json({ user: false });
};

module.exports = { getUser, login, logout };
