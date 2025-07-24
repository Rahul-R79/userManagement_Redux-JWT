const notFound = (req, res, next) => {
    res.status(404).send('page not found');
    next();
};

export default notFound;
