def main():
    with open('../puzzle.txt') as file:
        input = [row.rstrip().split(' ') for row in file]
    
    print(part_1(input))
    print(part_2(input))


def part_1(input):
    sum = 0
    for line in input:
        borders, char, password = line
        min_count, max_count = map(int, borders.split('-'))

        if min_count <= password.count(char.rstrip(':')) <= max_count:
            sum += 1
            
    return sum


def part_2(input):
    sum = 0
    for line in input:
        borders, char, password = line
        first_pos, second_pos = map(int, borders.split('-'))

        if (password[first_pos - 1] == char.rstrip(':')) != (password[second_pos - 1] == char.rstrip(':')):
            sum += 1

    return sum


if __name__ == '__main__':
    main()