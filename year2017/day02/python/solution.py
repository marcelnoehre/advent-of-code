def main():
    with open('../puzzle.txt') as file:
        input = [[int(num) for num in row.split('\t')] for row in file.read().split('\n')]
    
    print(part_1(input))
    print(part_2(input))


def part_1(input):
    return sum(max(row) - min(row) for row in input)


def part_2(input):
    result = 0
    for row in input:
        div, num = next(((n, m) for i, n in enumerate(row) for j, m in enumerate(row) if i != j and n % m == 0), (None, None))
        result += div / num if div is not None and num != 0 else 0
    return result


if __name__ == '__main__':
    main()