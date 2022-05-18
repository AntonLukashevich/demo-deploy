import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value)return null;
    if(!args)return value;
    args = args.toLowerCase();
    return value.filter((data: any) => data.name.toLowerCase().includes(args)
      || data.id == args || this.lookForItem(data,args) ) ;
  }

  private lookForItem(data: any, args?: any): any{
    let result = data.items?.some((item: any) => item.lines?.some( (line: any) => line.text.toLowerCase().includes(args)));
    return result;
  }

}
