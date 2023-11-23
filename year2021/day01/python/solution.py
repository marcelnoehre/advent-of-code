def main():
    print(part_1())
    print(part_2())


def part_1():
    return sum([b > a for a, b in zip(input, input[1:])])


def part_2():
    return sum(sum(input[i+1:i+4]) > sum(input[i:i+3]) for i in range(len(input)-2))


def setup(path):
    global input
    
    with open(path, 'r') as file:
        input = [int(row) for row in file]


if __name__ == '__main__':
    setup('../puzzle.txt')
    main()