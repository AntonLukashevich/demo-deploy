import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'tagFilter'
})

export class TagFilterPipe implements PipeTransform{
  transform(value: any, ...args: any[]): any {
    if(!value)return null;
    if(!args[0].length)return value;
    return value.filter((data: any) => data.tags?.some( (tag: any) => args[0].includes(tag)));
  }
}
