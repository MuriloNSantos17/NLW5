import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/Settings.Repositoriy";

interface ISettingsCreate{
   chat: boolean,
   username: string,
}

class SettingsService{
   private settingsRespository: Repository<Setting>;

   constructor()
   {
     this.settingsRespository = getCustomRepository(SettingsRepository);
   }
    async create({chat,username})
    {
      const settingsRespository = this.settingsRespository;

      const userAlreadyExists = await settingsRespository.findOne({
        username
      });

      if(userAlreadyExists)
      {
         throw new Error("Usuário já existe");
      }


      const settings = settingsRespository.create({
        chat,
        username,
      });
  
      await settingsRespository.save(settings);

      return settings; 

    }

    async findByUsername(username:string)
    {
       const settings = await this.settingsRespository.findOne(
          {username}
       );

       return settings;
    }

    async update(username:string,chat:boolean)
    {
       const settings = await this.settingsRespository.createQueryBuilder().
       update(Setting).set({chat}).where("username=:username",{
         username
       }).execute();
       
    }
}

export {SettingsService}