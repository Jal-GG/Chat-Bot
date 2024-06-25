import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
export const loginValidator = [
    body("email").trim().isEmail().withMessage("enter a valid email"),
    body("password").trim().isLength({ min: 6 }).withMessage("pass must be greater than 6 chars"),
];
export const signupValidator = [
    body("name").notEmpty().withMessage("name must not be empty"),
    ...loginValidator,
];
//# sourceMappingURL=validators.js.map