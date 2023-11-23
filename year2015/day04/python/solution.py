import hashlib

def main():
    print(part_1())
    print(part_2())


def part_1():
    return mine(input, 5)


def part_2():
    return mine(input, 6)


def setup(path):
    global input
    
    with open(path, 'r') as file:
        input = file.read()


def mine(input, digits):
    counter = 0
    while not hashlib.md5((input + str(counter)).encode()).hexdigest().startswith('0' * digits):
        counter += 1
        
    return counter


if __name__ == '__main__':
    setup('../puzzle.txt')
    main()