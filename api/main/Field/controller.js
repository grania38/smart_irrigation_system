const FieldModel = require('./field.model');

exports.createField = async (req ,res , next) =>  {
    try {
        req.body.userId = req.params.userId
        const saved = await FieldModel.createAField(req.body);
        res.status(201).send({id: saved._id});
    } catch (err) {
        return next(err);
    }
}

exports.removeById = (req, res) => {
    FieldModel.deleteField (req.params.fieldId)
        .then((result)=>{
            res.status(204);
        });
};

exports.findByLocation = (req , res , next) =>{
    try {
        const result = FieldModel.findBylocation(req.params.location);
        res.status(201).send(result);
    } catch (err) {
        return next(err);
    }

}

exports.getById = (req, res) => {
    FieldModel.findById(req.params.fieldId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getList = (req, res) => {
    FieldModel.findListOfFilds(req.params.userId).then ((result) => res.status(201).send(result))
};

exports.putById = (req, res) => {
    FieldModel.updateFieldInfo(req.params.fieldId, req.body)
        .then((result)=>{
            res.status(201).send({result});
        });
};
