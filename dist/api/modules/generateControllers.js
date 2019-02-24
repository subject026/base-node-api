"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Generic methods available for all models
const createOne = (model) => (req, res) => __awaiter(this, void 0, void 0, function* () {
    // If user on req we'll attach id to new record
    const createdBy = req.user ? req.user._id : false;
    try {
        const doc = yield model.create(Object.assign({}, req.body, { createdBy }));
        res.status(201).json({ data: doc });
    }
    catch (e) {
        console.error(e);
        res.status(400).json({ message: "Could not create document" });
    }
});
const getAll = (model) => (req, res) => __awaiter(this, void 0, void 0, function* () {
    // TO DO -
    // Add ability to get records based on document owner if arg passed in (id)
    try {
        const docs = yield model.find();
        res.status(200).json({ data: docs });
    }
    catch (e) {
        console.error(e);
        res.status(400).end();
    }
});
// Export fn that takes model and produces
// obj containing all generic crud controllers
const generateControllers = (model) => ({
    createOne: createOne(model),
    getAll: getAll(model)
});
exports.default = generateControllers;
