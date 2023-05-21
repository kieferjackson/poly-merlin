
// Accepts both formats (US: 3.45 ; EU: 3,45)
const validDecimal = new RegExp(/^\d*[.,]\d*$/);
const usCleanNumber = new RegExp(/[^\d.]/g);
const euCleanNumber = new RegExp(/[^\d,]/g);

export const isValidDecimal = (value) => validDecimal.test(value);
export const cleanInvalidDecimal = (value) => {
    const point_separator = value.match(/\./);
    const comma_separator = value.match(',');

    if (point_separator && comma_separator) {
        // The value string contains both commas and periods, evaluate their order to determine format
        return comma_separator.index < point_separator.index 
            ? value.replace(usCleanNumber, '')  // Comma comes before point; assumed as US format
            : value.replace(euCleanNumber, ''); // Comma comes after point; assumed as EU format
    }
    else if (point_separator) {
        // Number separated by point, make sure both sides only contain numbers
        return value.replace(usCleanNumber, '');
    }
    else if (comma_separator) {
        // Number separated by comma, make sure both sides only contain numbers
        return value.replace(euCleanNumber, '');
    }
    else {
        // The string does not contain either separator, return with only numbers
        return value.replace(/[^\d]/g, '');
    }
}