const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
    lname:{
        type:String,

    },
    fname:{
        type:String,

    },
    email: { 
        type: String, 
  },
    country:{
            type:String

        },
    visa:{
            type:String
  
        },
    undergraduate:{
            type:String

        },
    semester:{
    type:String

    },
    year:{
        type:String

    },
    gender:{
        type:String

    },
    Degree_Con:{
        type:String

    },
    gpa:{
        type:String

    },
    status:{
        type:String,
    },
    defsem:{
        type:String
    },
    defyear:{
        type:String
    },
    notes:{
        type:String
    }

  });
  
const Form = mongoose.model('Form', FormSchema);
module.exports = Form;