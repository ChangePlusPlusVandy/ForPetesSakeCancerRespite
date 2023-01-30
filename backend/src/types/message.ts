import {Document} from 'mongoose'
import groupchat from './groupchat'
import user from './user'

export default interface message extends Document{
    user: user,
    message: String,
    groupchat: groupchat
}