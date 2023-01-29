import {Document} from 'mongoose'

export default interface groupchat extends Document{
    name: String,
    messages: [],
    users: []
}