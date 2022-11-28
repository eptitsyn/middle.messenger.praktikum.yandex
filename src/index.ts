namespace('a.b.c.d.e'); // "{"a":{"b":{"c":{"d":{"e":{}}}}}}"

export default namespace;

function namespace(s : string) {
    return s.split('.').reduceRight((accumulator, currentValue) => ({ [currentValue]: accumulator }), {});
}
