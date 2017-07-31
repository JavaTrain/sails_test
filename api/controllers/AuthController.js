module.exports = {

    login: function (req, res) {
        let email = req.param('email');
        let password = req.param('password');

        verifyParams(res, email, password);

        User.findOne({email: email}).then((user) => {
            if (!user) {
                return invalidEmailOrPassword(res);
            }
            signInUser(req, res, password, user)
        }).catch((err) => {
            return invalidEmailOrPassword(res);
        })
    }

};


function signInUser(req, res, password, user) {
    User.comparePassword(password, user).then((valid) => {
            if (!valid) {
                return this.invalidEmailOrPassword();
            } else {
                let responseData = {
                    user: user,
                    token: generateToken(user.id)
                };
                
                return ResponseService.json(200, res, "Successfully signed in", responseData)
            }
        }
    ).catch((err) => {
        return ResponseService.json(403, res, "Forbidden")
    })
}

function invalidEmailOrPassword(res) {
    return ResponseService.json(401, res, "Invalid email or password")
}

function verifyParams(res, email, password) {
    if (!email || !password) {
        return ResponseService.json(401, res, "Email and password required")
    }
}

function generateToken(user_id) {
    return JwtService.issue({id: user_id})
}