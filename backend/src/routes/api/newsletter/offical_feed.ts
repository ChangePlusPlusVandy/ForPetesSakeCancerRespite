import {Request, Response} from "express"
import CONFIG from "../../../Config"
import { User } from "../../../models/User"
import Newsletter from "../../../models/Newsletter"

async function offical_feed(req: Request, res: Response){
    try {
        const FSPCR_ID = CONFIG.fpscr_account
        
        if(!FSPCR_ID){
            res.status(404).json({error: "FPSCR Account not found"})
            return;
        }

        const FSPCR_OBJECT = await User.findById(FSPCR_ID)

        if(!FSPCR_OBJECT){
            res.status(404).json({error: "FPSCR Account not found"})
            return;
        }

        const FSPCR_MONGO = await User.findOne({_id: FSPCR_ID}).populate("newsletter").sort({ timestamp: -1 })

        let returnedObject: any = FSPCR_MONGO
        for(let i = 0; i < returnedObject.newsletter.length; i++){
            returnedObject.newsletter[i].name = FSPCR_MONGO.name
            returnedObject.newsletter[i].username = FSPCR_MONGO.username
        }
        res.status(200).json({posts: Newsletter})   

    } catch (error) {
        console.error(error)
        throw error
    }
}
export {offical_feed}