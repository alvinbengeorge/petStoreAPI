import { validateUser, view } from "./database.js";

async function authentication(req) {
    const { username, password } = req.headers;
    const result = await validateUser(username, password);
    if (result) {
        return result;
    } else {
        throw new Error("Unauthorized. Please provide valid credentials");
    }

}

async function isOwner(req, id) {
    const { username } = req.headers;
    const result = await view(id);
    if (result.owner !== username) {
        throw new Error("Unauthorized. Only owner can modify data" );
    }
}

export {
    authentication,
    isOwner
}