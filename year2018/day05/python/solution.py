def main():
    with open('../puzzle.txt') as file:
        input = file.read().split()
    
    print(part_1(input))
    print(part_2(input))


def part_1(input):
    return (len(react(input)))


def part_2(input):
    best = {"unit": None, "reacted": input}
    for i in range(26):
        reacted = react([unit for unit in input if unit.lower() != chr(ord('a') + i)])

        if len(reacted) < len(best["reacted"]):
            best = {"unit": chr(ord('a') + i), "reacted": reacted}

    return len(best["reacted"])


def react(units):
    result = []
    for unit in units:
        if len(result) > 0 and abs(ord(unit) - ord(result[-1])) == 32:
            result.pop()

        else:
            result.append(unit)
            
    return result


if __name__ == '__main__':
    main()