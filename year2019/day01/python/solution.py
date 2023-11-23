import math

def main():
    print(part_1())
    print(part_2())


def part_1():
    sum = 0
    for mass in input:
        sum += math.floor(mass / 3) - 2

    return sum


def part_2():
    sum = 0
    for mass in input:
        fuel = math.floor((mass / 3) - 2)
        while fuel > 0:
            sum += fuel
            fuel = math.floor((fuel / 3) -2)
    
    return sum


def setup(path):
    global input
    
    with open(path, 'r') as file:
        input = [int(row.rstrip()) for row in file]


if __name__ == '__main__':
    setup(('../puzzle.txt'))
    main()