module.exports.modelToJson = function (...args) {
    const modelObject = this.toObject();
    delete modelObject.__v;
    return modelObject;
}