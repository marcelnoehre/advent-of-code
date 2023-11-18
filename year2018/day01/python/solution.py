def main():
    with open('../puzzle.txt') as file:
        input = [int(num) for num in file]
    
    print(part_1(input))
    print(part_2(input))


def part_1(input):
    return sum(input)

def part_2(input):
    frequencies, frequency = set(), 0

    while True:
        for number in input:
            frequency += number
            
            if frequency in frequencies:
                return frequency

            frequencies.add(frequency)


if __name__ == '__main__':
    main()