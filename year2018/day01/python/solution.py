def main():
    print(part_1())
    print(part_2())


def part_1():
    return sum(input)

def part_2():
    frequencies, frequency = set(), 0

    while True:
        for number in input:
            frequency += number
            
            if frequency in frequencies:
                return frequency

            frequencies.add(frequency)


def setup(path):
    global input
    
    with open(path, 'r') as file:
        input = [int(num) for num in file]


if __name__ == '__main__':
    setup('../puzzle.txt')
    main()