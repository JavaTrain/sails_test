var _ = require('lodash');
module.exports = {
    create: (req, res) => {
        if (req.body.password !== req.body.confirmPassword) {
            return ResponseService.json(401, res, "Password doesn't match")
        }

        let allowedParameters = ["email", "password"];

        let data = _.pick(req.body, allowedParameters);

        User.create(data).then((user) => {
            let responseData = {
                user: user,
                token: JwtService.issue({id: user.id})
            };

            return ResponseService.json(200, res, "User created successfully", responseData)
        }).catch((error) => {
                if (error.invalidAttributes) {
                    return ResponseService.json(400, res, "User could not be created", error.Errors)
                }
            }
        )
    }
};