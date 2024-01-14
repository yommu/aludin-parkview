import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs'
import { DomSanitizer } from '@angular/platform-browser'


@Injectable({
  providedIn: 'root',
})
export class AppService {
  http: HttpClient = inject(HttpClient)
  sanitizer: DomSanitizer = inject(DomSanitizer)

  private request(level: -1 | 0 | 1 | 2) {
    switch (level) {
      case 0:
      case -1:
        return this.http.get('assets/prizemlje-prvi-sprat.svg', { responseType: 'text' })
      case 1:
        return this.http.get('assets/drugi-sprat.svg', { responseType: 'text' })
      case 2:
        return this.http.get('assets/treci-sprat.svg', { responseType: 'text' })
    }
  }

  public getSvg(level: -1 | 0 | 1 | 2) {
    return this.request(level).pipe(
      map((res: string) => {
        // Extract width and height from svg string
        const width = res.match(/width="(\d+)"/)?.[1]
        const height = res.match(/height="(\d+)"/)?.[1]

        return {
          width,
          height,
          data: this.sanitizer.bypassSecurityTrustHtml(res)
        }
      })
    )
  }
}
