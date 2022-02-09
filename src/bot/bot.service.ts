import { Hears, On, Start, Update } from 'nestjs-telegraf'
import { TimeService } from 'src/time/time.service'
import { UsersService } from 'src/users/users.service'
import { Context } from 'telegraf'
import { ReplyEnum } from './commands/reply.bot'

@Update()
export class WeatherBot {
  constructor(
    private readonly timeService: TimeService,
    private readonly usersService: UsersService
  ) {}

  @Start()
  private async start(ctx: Context) {
    await ctx.reply(ReplyEnum.START, {
      parse_mode: 'HTML',
    })
  }

  @Hears('/proceed')
  private async subscribeUser(ctx: Context) {
    await this.usersService.addUser(ctx.chat.id)
    await ctx.reply(ReplyEnum.REQUEST_TIME)
  }

  @Hears(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/)
  private async handleUserTime(ctx: Context) {
    if ('text' in ctx.message) {
      const { id } = ctx.chat
      const { text: time } = ctx.message
      await this.usersService.update({ time }, id)
      await ctx.reply(ReplyEnum.REQUEST_LOCATION, {
        reply_markup: {
          keyboard: [[{ text: 'location', request_location: true }]],
        },
      })
    }
  }

  @On('location')
  private async handleUserLocation(ctx: Context) {
    if ('location' in ctx.message) {
      const { location } = ctx.message
      const { id } = ctx.chat

      const { time } = await this.usersService.findOne(id)

      const updatedTime = this.timeService.utcTime(time, location)

      await this.usersService.update({ location, time: updatedTime }, id)

      await ctx.reply(ReplyEnum.FINISH)
    }
  }
}
