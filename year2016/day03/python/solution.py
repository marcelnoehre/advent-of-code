def main():
    print(part_1())
    print(part_2())


def part_1():
    return len([1 for a, b, c in input if check_triangle(a, b, c)])


def part_2():
    sum = 0
    for i in range(0, len(input), 3):
        for j in range(3):
            if check_triangle(input[i][j], input[i + 1][j], input[i + 2][j]):
                sum += 1

    return sum


def setup(path):
    global input
    
    with open(path, 'r') as file:
        input = [list(map(int, row.strip().split())) for row in file.read().split('\n')]


def check_triangle(a, b, c):
    return all([a + b > c, a + c > b, b + c > a])


if __name__ == '__main__':
    setup('../puzzle.txt')
    main()