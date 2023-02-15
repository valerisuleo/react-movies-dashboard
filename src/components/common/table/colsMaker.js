import _ from "lodash";

export function colsMaker(obj, cols, actions) {
    const colsName = Object.keys(obj)
        .filter((key) => {
            return cols.includes(key);
        })
        .map((item) => {
            return {
                key: item,
                label: _.startCase(item),
            };
        });

    if (actions?.length) {
        colsName.push({
            key: "actions",
            label: "",
            actions,
        });
    }

    return colsName;
}
