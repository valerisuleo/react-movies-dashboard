export function indexAssign(condition) {
    let index;
    // eslint-disable-next-line default-case
    switch (condition) {
        case "title":
            index = 1;
            break;
        case "dailyRentalRate":
            index = 3;
            break;
        case "numberInStock":
            index = 2;
            break;
        case "liked":
            index = 4;
            break;
        case "genre":
            index = 4;
            break;
    }
    return index;
}
