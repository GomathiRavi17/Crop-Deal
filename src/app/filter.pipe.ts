import{Pipe,PipeTransform} from '@angular/core';
import { filter } from 'rxjs';

@Pipe({
name:'filter'
})
export class FilterPipe implements PipeTransform{

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.trim().toLowerCase();

    return items.filter(it => {
      return it.name.toLowerCase().includes(searchText);
    });
  }
   
}