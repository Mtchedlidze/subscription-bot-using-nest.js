import { Start, Update, Hears, On } from 'nestjs-telegraf'
import { TimeService } from 'src/time/time.service'
import { Context } from 'telegraf'

@Update()
export class BotService {
  constructor(private readonly timeService: TimeService) {}
  @Start()
  async start(ctx: Context) {
    await ctx.reply('Welcome!')
  }
  @On('message')
  async test(ctx: Context) {
    const data = this.timeService.utcTime('22:40', { lon: 135, lat: 39 })

    console.log(data)
  }
}
