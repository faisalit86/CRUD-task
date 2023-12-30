const { validationResult } = require("../../middleware/utils");
const { check } = require("express-validator");

/**
 * Validates TaskCreation request
 */
const ValidateTaskCreation = [
    // check("user_id")
    //     .not()
    //     .isEmpty()
    //     .withMessage("User id is required"),
    check("title")
        .optional()
        .not()
        .isEmpty()
        .withMessage("Title is required"),
    check("description")
        .optional()
        .not()
        .isEmpty()
        .withMessage("Description is required"),
    check("due_date")
        .not()
        .isEmpty()
        .withMessage("Due date is required"),
    check("status")
        .not()
        .isEmpty()
        .withMessage("Satus is required"),
    (req, res, next) => {
        validationResult(req, res, next);
    }
];

/**
 * Validates userMessages request
 */
const clearTaskCreationMessages = [
    check("user_id")
        .not()
        .isEmpty()
        .withMessage("User is required"),
    (req, res, next) => {
        validationResult(req, res, next);
    }
];

module.exports={
    ValidateTaskCreation,
    clearTaskCreationMessages
}