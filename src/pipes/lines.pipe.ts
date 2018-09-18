import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'lines'})
export class LinesPipe implements PipeTransform {
    transform(value, args:string[]) : any {
        let keys = [];
        for (let key in value) {
            keys.push({key: key, value: value[key]});
        }
        return keys;
    }
}
