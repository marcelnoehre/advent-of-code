def main():
    print(part_1())
    print(part_2())


def part_1():
    g, e = '', ''

    for i in range(len(input[0])):
        dpp = [binary[i] for binary in input]

        if dpp.count('0') > len(input) / 2:
            g += '0'
            e += '1'
        else:
            g += '1'
            e += '0'

    return int(g, 2) * int(e, 2)


def part_2():
    o, c = input, input

    for i in range(len(o[0])):
        if len(o) == 1:
            break

        dpp = [binary[i] for binary in o]
        if dpp.count('1') >= len(o) / 2:
            cbit = '1'  
        else: 
            cbit = '0'

        o = [binary for binary in o if binary[i] == cbit]

    for i in range(len(c[0])):
        if len(c) == 1:
            break

        dpp = [binary[i] for binary in c]
        if dpp.count('1') >= len(c) / 2:
            lcbit = '0'  
        else: 
            lcbit = '1'

        c = [binary for binary in c if binary[i] == lcbit]

    return int(o[0], 2) * int(c[0], 2)


def setup(path):
    global input
    
    with open(path, 'r') as file:
        input = [row.strip() for row in file]


if __name__ == '__main__':
    setup('../puzzle.txt')
    main()