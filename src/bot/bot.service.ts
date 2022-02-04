import { Hears, On, Start, Update } from 'nestjs-telegraf'
import { TimeService } from 'src/time/time.service'
import { UsersService } from 'src/users/users.service'
import { Context } from 'telegraf'
import { Reply } from './commands/reply.bot'

@Update()
export class WeatherBot {
  reply: Reply
  constructor(
    private readonly timeService: TimeService,
    private readonly usersService: UsersService,
  ) {}

  @Start()
  async start(ctx: Context) {
    await ctx.reply(Reply.START, {
      parse_mode: 'HTML',
    })
  }

  @Hears('/proceed')
  async subscribeUser(ctx: Context) {
    await this.usersService.addUser(ctx.chat.id)
    await ctx.reply(Reply.REQUEST_TIME)
  }

  @Hears(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/)
  async handleUserTime(ctx: Context) {
    if ('text' in ctx.message) {
      const { id } = ctx.chat
      const { text: time } = ctx.message
      await this.usersService.update({ time }, id)
    }
  }

  @On('location')
  async handleUserLocation(ctx: Context) {
    if ('location' in ctx.message) {
      const { location } = ctx.message
      const { id } = ctx.chat
      const user = await this.usersService.update({ location }, id)
      console.log(user)
    }
  }
}
