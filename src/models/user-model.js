import MongoDB from '../databases/mongodb';

import UserSchema from '../schemas/user-schema';

const connection = MongoDB.createConnection();

const User = connection.model('users', UserSchema, 'users');

export default User;
