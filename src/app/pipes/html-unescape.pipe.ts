import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlUnescape',
  standalone: true
})
export class HtmlUnescapePipe implements PipeTransform {

  transform(value: string): string {
    const doc = new DOMParser().parseFromString(value, "text/html");
    return doc.body.textContent || "";
  }
}
