import {Document} from 'mongoose'
import groupchat from './groupchat'

export default interface user extends Document{
    name: string,
    email: string,
    password: string,
    groupchats: [groupchat]
}