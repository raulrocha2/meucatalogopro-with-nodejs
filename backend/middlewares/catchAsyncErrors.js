module.exports = func => (req, resp, next) =>
        Promise.resolve(func(req, resp, next))
                .catch(next)