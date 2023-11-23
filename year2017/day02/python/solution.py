def main():
    print(part_1())
    print(part_2())


def part_1():
    return sum(max(row) - min(row) for row in input)


def part_2():
    result = 0
    for row in input:
        div, num = next(((n, m) for i, n in enumerate(row) for j, m in enumerate(row) if i != j and n % m == 0), (None, None))
        result += div / num if div is not None and num != 0 else 0
    return result


def setup(path):
    global input
    
    with open(path, 'r') as file:
        input = [[int(num) for num in row.split('\t')] for row in file.read().split('\n')]


if __name__ == '__main__':
    setup('../puzzle.txt')
    main()