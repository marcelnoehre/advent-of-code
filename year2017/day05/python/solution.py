def main():
    with open('../puzzle.txt') as file:
        input = [int(num) for num in file.read().split('\n')]
    
    print(part_1(input))
    print(part_2(input))


def part_1(input):
    return simulate(input[:], lambda offset: 1)


def part_2(input):
    return simulate(input[:], lambda offset: -1 if offset >= 3 else 1)


def simulate(inst, offset_rule):
    ptr, jumps = 0, 0
    while 0 <= ptr < len(inst):
        inst[ptr], ptr, jumps = inst[ptr] + offset_rule(inst[ptr]), ptr + inst[ptr], jumps + 1

    return jumps


if __name__ == '__main__':
    main()