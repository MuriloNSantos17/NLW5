import {getCustomRepository, Repository} from "typeorm";

import { ConnectionRepository } from "../repositories/ConnectionsRepository";
import { Connection} from "../entities/Connection"

interface IConnectionCreate{
  socket_id: string;
  user_id: string;
  admin_id?:string;
  id?:string;
}
class ConnectionService{
      private ConnectionRepository: Repository<Connection>

      constructor(){
        this.ConnectionRepository = getCustomRepository(ConnectionRepository);
      }

      async create({socket_id,user_id,admin_id, id }: IConnectionCreate) {
        const connection = this.ConnectionRepository.create({
          socket_id,
          user_id,
          admin_id,
          id
        });

        await this.ConnectionRepository.save(connection);

        return connection;
      }

      async findByUserId(user_id:string)
      {
        const connection = await this.ConnectionRepository.findOne(user_id);

        return connection;
      }

      async findAllWithOutAdmin(){
        const connections = await this.ConnectionRepository.find(
          { 
            where:{admin_id:null},
            relations:["user"]
          }
        );
        return connections;
      }
      
}

export{ConnectionService}