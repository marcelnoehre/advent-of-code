def main():
    print(part_1())
    print(part_2())


def part_1():
    for i in range(len(input) - 1):
        for j in range(i + 1, len(input)):
            if input[i] + input[j] == 2020:
                return input[i] * input[j]


def part_2():
    for i in range(len(input)):
        for j in range(i + 1, len(input)):
            for k in range(j + 1, len(input)):
                if input[i] + input[j] + input[k] == 2020:
                    return input[i] * input[j] * input[k]
                

def setup(path):
    global input
    
    with open(path, 'r') as file:
        input = [int(row) for row in file]


if __name__ == '__main__':
    setup('../puzzle.txt')
    main()