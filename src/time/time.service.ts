import { Injectable } from '@nestjs/common'
import * as moment from 'moment-timezone'
import { find } from 'geo-tz'

@Injectable()
export class TimeService {
  private moment = moment

  private getTimezone(location: { longitude: number; latitude: number }) {
    return find(location.latitude, location.longitude)
  }

  utcTime(time: string, location: { longitude: number; latitude: number }) {
    console.log()
    const [timezone] = this.getTimezone(location)
    const utcTime = this.moment.tz(time, 'HHmm', timezone).utc().format('HH:mm')
    return utcTime
  }
}
