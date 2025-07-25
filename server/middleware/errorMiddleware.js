//error handling middleware

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).json({
        success: false,
        message: err.message || "Something went wrong"
    });
};

export default errorHandler;
