// const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
// let oldParse = JSON.parse;
// JSON.parse = function(text: string, reviver?: (key: any, value: any) => any) {
//     return oldParse(text, (key: any, value: any) => {
//         if (typeof value === 'string' && dateFormat.test(value))
//             return new Date(value);
//         else if (reviver)
//             return reviver(key, value);
//         else
//             return value;
//     });
// }