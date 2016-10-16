var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var fileSchema = new mongoose.Schema({

    uploaderID: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    uploaderName: {type: String, required: true},

    file: {
        filename: String,
        filepath: String,   //path to the file on the server (after upload)
        size: Number,
        type: String
    },

    description: String,
    dateUploaded: String,

});

mongoose.model('File', fileSchema);
