import jwt from "jsonwebtoken";
export const tokenGen = (name, email, expiresIn) => {
    const payload = { name, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    return token;
};
//# sourceMappingURL=token-gen.js.map