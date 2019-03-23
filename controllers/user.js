const handleUserGet = (req, res, db) => {
  const { id } = req.params;
  db.select('*')
    .from('users')
    .where({ id })
    .then(user => {
      if (user.length) {
        return res.json(user[0]);
      }
      res.status(400).json('Could not find user');
    })
    .catch(err => res.status(400).json('User does not exist'));
};

module.exports = {
  handleUserGet
};
