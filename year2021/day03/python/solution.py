def main():
    with open('../puzzle.txt') as file:
        input = [row.strip() for row in file]
    
    print(part_1(input))
    print(part_2(input))


def part_1(input):
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


def part_2(input):
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


if __name__ == '__main__':
    main()