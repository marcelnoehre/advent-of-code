import re

def main():    
    print(part_1())
    print(part_2())


def part_1():
    return validate([r'^(?!.*ab)(?!.*cd)(?!.*pq)(?!.*xy).*$', r'^(.*[aeiou]){3}.*$', r'(.)\1'], input)


def part_2():
    return validate([r'([a-z][a-z]).*\1', r'([a-z])[a-z]\1'], input)


def setup(path):
    global input
    
    with open(path, 'r') as file:
        input = [row for row in file]


def validate(valid, input):
    counter = 0
    for string in input:
        if all(re.search(pattern, string) for pattern in valid):
            counter += 1

    return counter


if __name__ == '__main__':
    setup('../puzzle.txt')
    main()