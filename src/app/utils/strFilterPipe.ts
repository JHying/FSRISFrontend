import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'strFilter'
})
export class StrFilterPipe implements PipeTransform {

  transform(items: any[], fieldName: string, searchText: string): any[] {

    // return empty array if array is falsy
    if (!items) {
      return [];
    }

    // return the original array if search text is empty
    if (!searchText) {
      return items;
    }

    // retrun the filtered array
    return items.filter(item => {
      if (item && item[fieldName]) {
        return item[fieldName].includes(searchText);
      }
      return false;
    });
  }
}
