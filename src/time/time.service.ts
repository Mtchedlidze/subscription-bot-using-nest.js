import { Injectable } from '@nestjs/common'
import * as moment from 'moment-timezone'
import { find } from 'geo-tz'

@Injectable()
export class TimeService {
  private moment = moment

  private getTimezone(location: { lon: number; lat: number }) {
    return find(location.lat, location.lon)
  }

  utcTime(time: string, location: { lon: number; lat: number }) {
    console.log()
    const [timezone] = this.getTimezone(location)
    const utcTime = this.moment.tz(time, 'HHmm', timezone).utc().format('HH:mm')
    return utcTime
  }
}
