import axios from 'axios';
import bcrypt from 'bcrypt';

export const UserRegistration = data => {
    const password = data.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    data["password"] = hash;

    return axios.post('http://localhost:5000/api/v1/signup', data)
        .then(res => res.status);
};

// export const UsernameValidation = data => (
//     axios.post('http://localhost:5000/registration/validateUsername', data)
//     .then(exist => exist.status)
// )