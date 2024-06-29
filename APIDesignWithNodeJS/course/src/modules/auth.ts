import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

export const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash);
}

// export const hashPassword = (password) => {
//     return bcrypt.hashSync(password, 5);
// };

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5);
};

export const createJWT = (user) => {
    const token = jwt.sign(
      { id: user.id, username: user.username },
      "some_secret"
    );
    return token;
  };

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        res.status(401);
        res.send("NOT AUTHORIZED");
        return;
    }

    const [, token] = bearer.split(" ");
    console.log(bearer.split(" "));
    if (!token) {
        res.status(401);
        res.send("INVALID TOKEN: 1");
        return;
    }

    try {
        const user = jwt.verify(token, "some_secret");
        req.user = user;
        next();
    } catch (e) {
        console.error(e);
        res.status(401);
        res.send("INVALID TOKEN: 2");
        return;
    }
}