const { add } = require('./calculator');

test('Add - success', () => {
    expect(add(1, 2)).toBe(3);
})

test('Adds 1 + 2 + 3 to equal 6', () => {
    expect(add(1, add(2, 3))).toBe(6);
})

test('Add - undefined', () => {
    expect(add(1, 3)).not.toBe(undefined);
})