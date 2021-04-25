import { Entity, EntityRepository, Repository } from "typeorm";
import {Messages} from "../entities/Message"

@EntityRepository(Messages)
class MessagesRespository extends Repository<Messages>{

}

export {MessagesRespository}