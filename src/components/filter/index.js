export default angular.module('app.components.filters', [])
    // 解析电影 & 电视类型
    .filter('parseGenre', () => {
        const originGenres = require('./origin-genres').default;
        return (genres) => {
            const result = [];
            for (const genre of genres) {
                originGenres.forEach((origin) => {
                    if (origin.id === genre) {
                        result.push(origin.name);
                    }
                });
            }
            return result.slice(0, 3).join(', ');
        };
    })
    // 截断文本
    .filter('cutText', () => {
        return (str, len) => {
            let newLength = 0;
            let newStr = '';
            let singleChar = '';
            const chineseRegex = /[^\x00-\xff]/g;
            const strLength = str.replace(chineseRegex, '**').length;
            for (let i = 0; i < strLength; i++) {
                singleChar = str.charAt(i).toString();
                if (singleChar.match(chineseRegex) !== null) {
                    newLength += 2;
                } else {
                    newLength++;
                }
                if (newLength > len) {
                    break;
                }
                newStr += singleChar;
            }

            if (strLength > len) {
                newStr += '...';
            }
            return newStr;
        };
    });
