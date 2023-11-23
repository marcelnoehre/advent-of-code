def main():
    print(part_1())
    print(part_2())


def part_1():
    seen, duplicated = set(), set()
    for row in input:
        if not (row[0][0] != row[1][0] and row[0][1] != row[1][1]):
            seen, duplicated = check_row(iterate(row), seen, duplicated)

    return len(duplicated)


def part_2():
    seen, duplicated = set(), set()
    for row in input:
        seen, duplicated = check_row(iterate(row), seen, duplicated)

    return len(duplicated)


def setup(path):
    global input
    
    with open(path, 'r') as file:
        input = [[[int(number) for number in side.split(',')] for side in row.split(' -> ')] for row in file.read().split('\n')]


def check_row(iterator, seen, duplicated):
    iteration = next(iterator, None)
    while iteration is not None:
        x, y = iteration
        coordinate = f"{x},{y}"

        if coordinate in seen:
            duplicated.add(coordinate)

        seen.add(coordinate)
        iteration = next(iterator, None)

    return seen, duplicated


def iterate(row):
    dx, dy = (1 if row[1][0] > row[0][0] else -1 if row[1][0] < row[0][0] else 0, 1 if row[1][1] > row[0][1] else -1 if row[1][1] < row[0][1] else 0)
    x, y = row[0][0], row[0][1]
    yield x, y

    while (x, y) != (row[1][0], row[1][1]):
        if x != row[1][0]:
            x += dx

        if y != row[1][1]:
            y += dy

        yield x, y


if __name__ == '__main__':
    setup('../puzzle.txt')
    main()