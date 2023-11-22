def main():
    with open('../puzzle.txt') as file:
        input = [list(map(int, row.strip().split())) for row in file.read().split('\n')]
    
    print(part_1(input))
    print(part_2(input))


def part_1(input_data):
    return len([1 for a, b, c in input_data if check_triangle(a, b, c)])


def part_2(input_data):
    sum = 0
    for i in range(0, len(input_data), 3):
        for j in range(3):
            if check_triangle(input_data[i][j], input_data[i + 1][j], input_data[i + 2][j]):
                sum += 1

    return sum


def check_triangle(a, b, c):
    return all([a + b > c, a + c > b, b + c > a])


if __name__ == '__main__':
    main()