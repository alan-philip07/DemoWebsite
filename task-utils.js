function isValidTaskName(name) {
    return typeof name === "string" && name.trim().length > 0;
}

if (typeof module !== "undefined") {
    module.exports = { isValidTaskName };
}