const fs = require('fs').promises
const {join, dirname} = require("path");

module.exports.modelToJson = function () {
    const modelObject = this.toObject();
    delete modelObject.__v;
    return modelObject;
}

module.exports.deleteImage = async (imageName, subFolder) => {
    try {
        const path = join(dirname(__dirname), `public/images/${subFolder}`, imageName)
        await fs.unlink(path)
    } catch (e) {
        console.log(e.message)
    }

}