def main():
    print(part_1())
    print(part_2())


def part_1():
    sum = 0
    for char in input:
        sum += 1 if char == '(' else -1
    return sum


def part_2():
    return next((index + 1 for index, element in enumerate(input) if find_index_condition(element, index, input)), None)


def setup(path):
    global input
    
    with open(path, 'r') as file:
        input = [*file.read()]


def find_index_condition(element, index, array):
    return sum(1 if c == '(' else -1 for c in array[:index + 1]) == -1


if __name__ == '__main__':
    setup('../puzzle.txt')
    main()