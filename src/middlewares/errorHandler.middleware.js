const errorHandler = (err, req, res, next) => {
  console.log('error code is', err.code)
  res.status(err.code);

  if(err.message) {
    return res.json({ message: err.message})  
  };

  return res.end();
};

module.exports = {
  errorHandler,
}