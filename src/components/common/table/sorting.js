import _ from "lodash";

export function sorting(collection, sortColumnPath, sortColumnOrder) {
    return _.orderBy(collection, sortColumnPath, sortColumnOrder);
}
