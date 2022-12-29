export function navigateTo(props, url, data) {
    props.navigate(url, {
        state: {
            data,
        },
    });
}

export function isTotallyEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}
