module.exports = fn => (req, res) => {
  Promise.resolve(fn(req, res)).catch(err => {
    console.log(err);
    res.send({ error: err.message });
  });
};
