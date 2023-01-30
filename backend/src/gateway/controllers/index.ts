import {Request, Response} from 'express'
import GroupChats from '../../models/Groupchat'
import groupchat from '../../types/groupchat'
import Messaging from '../../models/Messages'
import User from '../../models/User'
import user from '../../types/user'


async function getGroupChatByID(req: Request, res: Response){
    try {
        const gcID = req.query.id
        const groupChat = await GroupChats.findById({"_id": gcID})
        if(groupChat === null){
            res.status(200).json({"message":"GROUPCHAT DOES NOT EXIST"})
        } else{
            let expandedGroupChat = {
                "_id": groupChat._id,
                "name": groupChat.name,
                "messages":[],
                "users": []
            }
            // add messages to the thing
            for(let i = 0; i < groupChat.messages.length; ++i){
                const message = await Messaging.findById({"_id": groupChat.messages[i]._id})
                expandedGroupChat.messages.push({"_id": message._id, "user": message.user, "message": message.message})
            }
            for(let i = 0; i < groupChat.users.length; ++i){
                const userFromArray = await User.findById({"_id": groupChat.users[i]._id})
                expandedGroupChat.messages.push({"_id": userFromArray._id, "name": userFromArray.name})
            }
            res.status(200).json({"message":"SUCCESS", "groupchat": expandedGroupChat})
        }
        
    } catch (error) {
        console.log(error)
        throw error
    }
}


async function getGroupsChats(req: Request, res: Response){
    try{
        let groupChatIds = []
        const groupChats: groupchat[] = await GroupChats.find()
        for(let i = 0; i < groupChats.length; ++i){
            groupChatIds.push(groupChats[i]._id)
        }
        res.status(200).json({"message": "GroupChat IDs sent successfully", "groupchatIds": groupChatIds})

    } catch(error){
        console.log(error)
        throw error
    }
}

async function createGroupChat(req: Request, res: Response){
    try {
        const body = {
            users: req.body.user,
            name: req.body.name
        }
        if(body.users.length <= 0 || body.name.length() <= 0){
            res.status(404).json({"message": "ERROR", "ERROR": "INVALID NAME OR EMPTY ARRAY"})
        } else{
            // add to User, groupchat
            // go through to make sure valid ids
            for(let i = 0; i < body.users.length; ++i){
                const user: user = await User.findById(body.users[i]._id, (err, val) =>{
                    if(err || val === null){
                        res.status(404).json({"message": "ERROR", "ERROR": err})
                    } 
                })
            }
            // good users, create group chat
            const GroupChatToBeAdded = new GroupChats({"name": body.name, "messages": [], "users": body.users})
            const added = await GroupChatToBeAdded.save()
            // now add users to the groupchats
            for(let i = 0; i < body.users.length; ++i){
                await User.findByIdAndUpdate({"_id": body.users[i]}, {$push:{"groupchats": added._id}})
            }
            res.status(200).json({"message":"SUCCESS", "newGroupChat": added})
        }

    } catch (error) {
        console.log(error)
        throw error
    }
}


export {getGroupsChats, createGroupChat,getGroupChatByID}