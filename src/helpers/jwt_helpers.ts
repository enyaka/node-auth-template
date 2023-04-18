const jwt = require("jsonwebtoken")
require('dotenv').config();

export interface ITokenCredantials {
    access_token: string
    refresh_token: string
}

class TokenCredentials implements ITokenCredantials {
    access_token: string;
    refresh_token: string;
}

function createJWT(email: string, username: string): ITokenCredantials {
    const access_token = jwt.sign({ email, username }, process.env.ACCESS_SECRET, {expiresIn: "15m"});
    const refresh_token = jwt.sign({ email, username }, process.env.REFRESH_SECRET, {expiresIn: "30d"});
    const token: ITokenCredantials = new TokenCredentials();
    token.access_token = access_token;
    token.refresh_token = refresh_token;
    console.log("New users accesToken is -> " + token.access_token + "\n refresh token is -> " + token.refresh_token)
    return token
}


export default { createJWT }