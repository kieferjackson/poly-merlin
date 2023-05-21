
// Accepts both formats (US: 3.45 ; EU: 3,45)
const validDecimal = new RegExp(/^\d*[.,]\d*$/);
const usCleanNumber = new RegExp(/[^\d.]/g);
const euCleanNumber = new RegExp(/[^\d,]/g);

export const isValidDecimal = (value) => validDecimal.test(value);
export const cleanInvalidDecimal = (value) => {
    const point = /\./;
    const comma = ',';

    const point_separator = value.match(point);
    const comma_separator = value.match(comma);

    if (point_separator && comma_separator) {
        // The value string contains both commas and periods, evaluate their order to determine format
        return comma_separator.index < point_separator.index 
            ? value.replace(usCleanNumber, '')  // Comma comes before point; assumed as US format
            : value.replace(euCleanNumber, ''); // Comma comes after point; assumed as EU format
    }
    else if (point_separator) {
        // Number separated by point, make sure both sides only contain numbers and one point
        let usFormattedNum = value.replace(usCleanNumber, '');

        // Find first point, and check that there is no comma afterwards
        const firstPoint = usFormattedNum.indexOf(point);
        const secondPoint = usFormattedNum.indexOf(point, firstPoint + 1);
        return secondPoint === -1 
            ? usFormattedNum 
            : usFormattedNum.slice(0, secondPoint) + usFormattedNum.slice(secondPoint + 1);
    }
    else if (comma_separator) {
        // Number separated by comma, make sure both sides only contain numbers and one comma
        let euFormattedNum = value.replace(euCleanNumber, '');

        // Find first comma, and check that there is no comma afterwards
        const firstComma = euFormattedNum.indexOf(comma);
        const secondComma = euFormattedNum.indexOf(comma, firstComma + 1);
        return secondComma === -1 
            ? euFormattedNum 
            : euFormattedNum.slice(0, secondComma) + euFormattedNum.slice(secondComma + 1);
    }
    else {
        // The string does not contain either separator, return with only numbers
        return value.replace(/[^\d]/g, '');
    }
}