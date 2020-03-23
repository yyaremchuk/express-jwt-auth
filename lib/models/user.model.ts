import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;


// curl -X POST -H "Content-type: application/json" http://127.0.0.1:3000/register -d '{ "fullName": "test", "email": "a.d@mail.com", "password": "", "location": "", "phone": "", "skills": ["piano"] }'
// curl -X GET -H "x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViN2JhYjU0ZjM1NzgzMDAxNTA0Zjk1NyIsImlhdCI6MTUzNDgzMTQ0NCwiZXhwIjoxNTM0OTE3ODQ0fQ.uGmezcocSvpsyuC2GdWxW9estx_GA3VgI_6UuNb2MiY" http://127.0.0.1:3000/me
// { "fullName": "test", "email": "a.d@mail.com", "password": "", "location": "", "phone": "", "skills": ["piano"] }

export const UserSchema = new Schema({
    fullName: {
        type: String,
        required: 'Enter a first name'
    },
    email: {
        type: String,
        required: 'Enter an email'
    },
    password: {
        type: String,
        required: 'Enter a password'
    },
    location: {
        type: String
    },
    phone: {
        type: Number
    },
    skills: {
        type: [String]
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
