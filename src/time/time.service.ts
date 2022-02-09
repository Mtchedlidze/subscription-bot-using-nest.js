import { Injectable } from '@nestjs/common'
import * as moment from 'moment-timezone'
import { find } from 'geo-tz'

@Injectable()
export class TimeService {
  moment = moment

  private getTimezone(location: {
    longitude: number
    latitude: number
  }): string[] {
    return find(location.latitude, location.longitude)
  }

  utcTime(
    time: string,
    location: { longitude: number; latitude: number }
  ): string {
    const [timezone] = this.getTimezone(location)
    const utcTime = this.moment.tz(time, 'HHmm', timezone).utc().format('HH:mm')
    return utcTime
  }

  formatTime(time: Date): string {
    return this.moment(time, 'HHmm').format('HH:mm')
  }
}
