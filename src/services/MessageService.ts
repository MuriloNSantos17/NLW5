import { getCustomRepository, Repository } from "typeorm"
import { Messages } from "../entities/Message";
import { MessagesRespository } from "../repositories/Messages.Respository"

interface IMessageCreate{
   admin_id?: string,
   text: string,
   user_id:string,
}

class MessageService{
    
    private messageRepository:Repository<Messages>;

    constructor(){
      this.messageRepository = getCustomRepository(MessagesRespository);
    }

    async create({admin_id,text,user_id}: IMessageCreate){
      const messageRepository = this.messageRepository;

      const message = messageRepository.create({
        admin_id,
        text,
        user_id
      });

      await messageRepository.save(message);

      return message;
    }

    async listByUser(user_id:string){
      const messageRepository = this.messageRepository;
      const list = await messageRepository.find(
        { 
          where:{user_id},
          relations:["user"]
        }
      );
      return list;
    }

    
}

export{MessageService}