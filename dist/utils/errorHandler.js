"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (res, error) => {
    res.status(500).json({
        success: false,
        message: error.message ? error.message : error,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map