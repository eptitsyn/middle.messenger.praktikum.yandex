function* stepRange(start, end, step) {
    for (let i = start; start < end ? i < end : i > end ; i += step) {
        yield i;
    }
}

function range(start = 0, end, step, isRight) {
    if (end == null) {
        end = start;
        start = 0;
    }
    step = step == null ? (start < end ? 1 : -1) : step;
    const length = Math.abs(Math.floor((end - start) / (step || 1)));

    let iter = stepRange(start, end, step);
    let result = Array.from(Array(length), () => iter.next().value);
    return isRight ? result.reverse() : result;
}