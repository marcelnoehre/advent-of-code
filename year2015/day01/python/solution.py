def main():
    with open('../puzzle.txt') as file:
        input = [*file.read()]
    
    print(part_1(input))
    print(part_2(input))


def part_1(input):
    sum = 0
    for char in input:
        sum += 1 if char == '(' else -1
    return sum


def part_2(input):
    return next((index + 1 for index, element in enumerate(input) if find_index_condition(element, index, input)), None)


def find_index_condition(element, index, array):
    return sum(1 if c == '(' else -1 for c in array[:index + 1]) == -1


if __name__ == '__main__':
    main()