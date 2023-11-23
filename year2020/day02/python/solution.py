def main():
    print(part_1())
    print(part_2())


def part_1():
    sum = 0
    for line in input:
        borders, char, password = line
        min_count, max_count = map(int, borders.split('-'))

        if min_count <= password.count(char.rstrip(':')) <= max_count:
            sum += 1
            
    return sum


def part_2():
    sum = 0
    for line in input:
        borders, char, password = line
        first_pos, second_pos = map(int, borders.split('-'))

        if (password[first_pos - 1] == char.rstrip(':')) != (password[second_pos - 1] == char.rstrip(':')):
            sum += 1

    return sum


def setup(path):
    global input
    
    with open(path, 'r') as file:
        input = [int(row) for row in file]


if __name__ == '__main__':
    setup('../puzzle.txt')
    main()