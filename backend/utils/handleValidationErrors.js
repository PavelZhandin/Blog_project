import { validationResult } from "express-validator";

/** Провека авторизации. */
export function handleValidationErrors (req, res, next) {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }

    next();
}
