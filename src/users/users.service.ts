import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UpdateDto } from './dto/update.dto'
import { User } from './interfaces/user.interface'

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  addUser(chatID: number): Promise<User> {
    const user = new this.userModel({ chatID })

    return user.save()
  }

  async update(properties: Partial<UpdateDto>, chatID: number): Promise<User> {
    const user = await this.userModel.findOne({ chatID })
    Object.assign(user, properties)
    return user.save()
  }
}
