import {Pipe} from '@angular/core';

@Pipe({ name: 'truncate' })
export class TruncatePipe {
	public transform(value: string, args: string[]): any {
		let length = parseInt(args[0] || '5', 10),
			suffix = args[1] || '';
		if (value.length <= length) {
			return value;
		}
		return value.substring(0, length) + suffix;
	}
}
