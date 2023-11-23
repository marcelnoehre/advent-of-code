def main():
    print(part_1())
    print(part_2())


def part_1():
    return max(input)


def part_2():
    return sum(sorted(input, reverse=True)[:3])


def setup(path):
    global input
    
    with open(path, 'r') as file:
        input = [sum(map(int, input_string.split())) for input_string in file.read().split('\n\n')]


if __name__ == '__main__':
    setup('../puzzle.txt')
    main()