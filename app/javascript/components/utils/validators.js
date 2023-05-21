
// Accepts both formats (US: 3.45 ; EU: 3,45)
const validDecimal = new RegExp(/^\d*[.,]\d*$/);
// RegExp to remove non-numeric characters
const usCleanNumber = new RegExp(/[^\d.]/g);
const euCleanNumber = new RegExp(/[^\d,]/g);

export const isValidDecimal = (value) => validDecimal.test(value);
export const cleanInvalidDecimal = (value) => {
    const point_separator = value.match(/\./);
    const comma_separator = value.match(/,/);

    if (point_separator && comma_separator) {
        // The value string contains both commas and periods, evaluate their order to determine format
        return comma_separator.index < point_separator.index 
            ? cleanAsUS(value)  // Comma comes before point; assumed as US format
            : cleanAsEU(value); // Comma comes after point; assumed as EU format
    }
    else if (point_separator) {
        // The string is separated by a point, remove any excess characters
        return cleanAsUS(value);
    }
    else if (comma_separator) {
        // The string is separated by a comma, remove any excess characters
        return cleanAsEU(value);
    }
    else {
        // The string does not contain either separator, return with only numbers
        return value.replace(/[^\d]/g, '');
    }

    function cleanAsUS(num_string) {
        const pointChar = '.';

        // Number separated by point, make sure both sides only contain numbers and one point
        let usFormattedNum = num_string.replace(usCleanNumber, '');

        // Find first point, and check that there is no comma afterwards
        const firstPoint = usFormattedNum.indexOf(pointChar);
        const secondPoint = usFormattedNum.indexOf(pointChar, firstPoint + 1);

        return secondPoint === -1 
            // Only one comma separator, return as is
            ? usFormattedNum 
            // Check that there are no longer commas by checking for at last index
            : usFormattedNum.lastIndexOf(pointChar) === secondPoint 
                ? usFormattedNum.slice(0, secondPoint) + usFormattedNum.slice(secondPoint + 1) 
                : '';
    }

    function cleanAsEU(num_string) {
        const commaChar = ',';

        // Number separated by comma, make sure both sides only contain numbers and one comma
        let euFormattedNum = num_string.replace(euCleanNumber, '');

        // Find first comma, and check that there is no comma afterwards
        const firstComma = euFormattedNum.indexOf(commaChar);
        const secondComma = euFormattedNum.indexOf(commaChar, firstComma + 1);

        return secondComma === -1 
            // Only one comma separator, return as is
            ? euFormattedNum 
            // Check that there are no longer commas by checking for at last index
            : euFormattedNum.lastIndexOf(commaChar) === secondComma 
                ? euFormattedNum.slice(0, secondComma) + euFormattedNum.slice(secondComma + 1) 
                : '';
    }
}