import hashlib

def main():
    with open('../puzzle.txt') as file:
        input = file.read()
    
    print(part_1(input))
    print(part_2(input))


def part_1(input):
    return mine(input, 5)


def part_2(input):
    return mine(input, 6)


def mine(input, digits):
    counter = 0
    while not hashlib.md5((input + str(counter)).encode()).hexdigest().startswith('0' * digits):
        counter += 1
    return counter


if __name__ == '__main__':
    main()