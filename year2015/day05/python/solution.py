import re

def main():
    with open('../puzzle.txt') as file:
        input = [row for row in file]
    
    print(part_1(input))
    print(part_2(input))


def part_1(input):
    return validate([r'^(?!.*ab)(?!.*cd)(?!.*pq)(?!.*xy).*$', r'^(.*[aeiou]){3}.*$', r'(.)\1'], input)


def part_2(input):
    return validate([r'([a-z][a-z]).*\1', r'([a-z])[a-z]\1'], input)


def validate(valid, input):
    counter = 0
    for string in input:
        if all(re.search(pattern, string) for pattern in valid):
            counter += 1

    return counter


if __name__ == '__main__':
    main()