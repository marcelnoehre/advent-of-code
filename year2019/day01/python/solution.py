import math

def main():
    with open('../puzzle.txt') as file:
        input = [int(row.rstrip()) for row in file]
    
    print(part_1(input))
    print(part_2(input))


def part_1(input):
    sum = 0
    for mass in input:
        sum += math.floor(mass / 3) - 2

    return sum


def part_2(input):
    sum = 0
    for mass in input:
        fuel = math.floor((mass / 3) - 2)
        while fuel > 0:
            sum += fuel
            fuel = math.floor((fuel / 3) -2)
    
    return sum


if __name__ == '__main__':
    main()