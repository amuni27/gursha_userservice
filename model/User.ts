import {Schema,model} from 'mongoose';


const UserSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    phone_number: {type: String, required: true},
    email: {type: String, required: true},
    password:{type: String, required: true},
})

model('User', UserSchema);