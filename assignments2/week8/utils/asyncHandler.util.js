


const asyncHandler = (fn) => {
    return (req, res, next) => { fn(req, res).catch((err) => next(err)) }
}

module.exports = asyncHandler