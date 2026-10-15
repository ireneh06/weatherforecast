export class MyUnixValueConverter{
  toView(val: number):string{
    const date = new Date(val * 1000); 

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const time = `${hours}:${minutes}`;
    return time;
  }
}
