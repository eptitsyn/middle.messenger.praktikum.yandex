function isEmpty(value) {
    if (!isNaN(value)) return true;
    if (Array.isArray(value)) return !value.length;
    if (value instanceof Map || value instanceof Set) return !value.size;
    if (value instanceof String) return !value.length;
    if (
        value &&
        Object.keys(value).length === 0 &&
        Object.getPrototypeOf(value) === Object.prototype
    )
        return true;
    return !value;
}

function isEmpty2(value) {
    if (typeof value === "number" || typeof value === "boolean") return true;
    if (value?.length === 0 || value?.size === 0) return true;
    return !value;
}
