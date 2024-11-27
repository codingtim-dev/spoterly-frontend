import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'imageUrl',
  standalone: true,
  pure: true
})
export class ImageUrlPipe implements PipeTransform {
  transform(id: string): string {
    return `http://localhost:8080/api/images/${id}`;
  }
}
