import re

def main():
    print(part_1())
    print(part_2())


def part_1():
    return sum(int(room[1]) for room in input if ''.join(sort_chars(room[0].replace('-', ''))[:5]) == room[2])


def part_2():
    for room in input:
        decrypted_name = ''.join([chr((ord(c) - 0x61 + int(room[1])) % 26 + 0x61) for c in room[0].replace('-', ' ')])

        if "north" in decrypted_name:
            return int(room[1])
        

def setup(path):
    global input
    
    with open(path, 'r') as file:
        pattern = re.compile(r'^([a-z\-]+)-(\d+)\[([a-z]+)\]$')
        input = [pattern.match(room).groups() for room in file.read().split('\n') if pattern.match(room)]
        

def sort_chars(input_string):
    count = {}
    for char in input_string:
        count[char] = count.get(char, 0) + 1

    return sorted(count.keys(), key=lambda x: (-count[x], x))


if __name__ == '__main__':
    setup('../puzzle.txt')
    main()