import mongoose from 'mongoose';
import { UserMinimal } from './user.model';
const Schema = mongoose.Schema;

export type Group = {
    id: string,
    name: string,
    members: UserMinimal[]
}

export type NewGroup = {
    name: string,
    members: UserMinimal[]
}

const schema = new Schema({
        name: { type: String, required: true },
        members: { type: [Object], required: true }
    }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Group', schema);

export type GroupRequest = {
    group: Group
}