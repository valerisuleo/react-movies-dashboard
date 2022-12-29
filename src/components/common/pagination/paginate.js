import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
    const indexStart = (pageNumber - 1) * pageSize;
    return _(items).slice(indexStart).take(pageSize).value();
}
