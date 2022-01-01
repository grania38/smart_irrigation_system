const mongoose = require ('mongoose') 

const fieldSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    address : {type: String, lowercase:true},
    geoLocation: {
        type: [ Number , Number ], 
        required: true ,
        default: [ 0 , 0],
        index: {unique: true} 
    },
    plants: {type: [String]},
} ,{timestamps : true}
);


module.exports = mongoose.model('Field' , fieldSchema)
