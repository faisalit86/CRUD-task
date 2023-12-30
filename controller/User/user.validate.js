const { validationResult } = require("../../middleware/utils");
const { check } = require("express-validator");

/**
 * Validates UserMessage request
 */
const ValidateCreateUser = [
    check("first_name")
        .optional()
        .not()
        .isEmpty()
        .withMessage("First name is required"),
    check("last_name")
        .optional()
        .not()
        .isEmpty()
        .withMessage("Last Name is required"),
    check("email")
        .not()
        .isEmpty()
        .withMessage("Email is required"),
    check("password")
        .not()
        .isEmpty()
        .withMessage("password is required"),
    (req, res, next) => {
        validationResult(req, res, next);
    }
];

/**
 * Validates userMessages request
 */
const clearUserCreationMessages = [
    check("user_id")
        .not()
        .isEmpty()
        .withMessage("User is required"),
    (req, res, next) => {
        validationResult(req, res, next);
    }
];

module.exports={
    ValidateCreateUser,
    clearUserCreationMessages
}