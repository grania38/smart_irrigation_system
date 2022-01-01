
const Field = require('mongoose').model('Field')

exports.createAField = async (fieldData) => {
    const field = new Field(fieldData);
    return await field.save();
};

exports.deleteField = (fieldId) => {
    return new Promise((resolve, reject) => {
        Field.deleteOne({_id:fieldId }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
}

exports.updateFieldInfo = (id , fieldData) =>{
    return new Promise((resolve, reject) => {
        Field.findByIdAndUpdate(id,fieldData,function (err,field) {
            if (err) reject(err);
            resolve(field);
        });
    });
}

exports.findBylocation = (location) => {
    return Field.find({goloactaion : location})        
};

exports.findById=(id) => {
    return Field.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
}

exports.findListOfFilds = (userId) => {
    return Field.find({"userId" : userId})
}
