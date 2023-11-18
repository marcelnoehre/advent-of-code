import re

def main():
    with open('../puzzle.txt') as file:
        input = [list(map(int, re.findall(r'\d+', claim))) for claim in file.readlines()]
    
    print(part_1(input))
    print(part_2(input))


def part_1(input):
    fabric, overlaps = [[0] * 1000 for _ in range(1000)], 0

    for _, x, y, w, h in input:
        for i in range(x, x + w):
            for j in range(y, y + h):
                if fabric[i][j] == 1:
                    overlaps += 1

                fabric[i][j] += 1
    
    return overlaps


def part_2(input):
    fabric, no_overlap = [[0] * 1000 for _ in range(1000)], set()

    for claim_id, x, y, w, h in input:
        no_overlap.add(claim_id)
        
        for i in range(x, x + w):
            for j in range(y, y + h):
                if fabric[i][j] == 0:
                    fabric[i][j] = claim_id

                else:
                    no_overlap.discard(claim_id)
                    no_overlap.discard(fabric[i][j])

    return int(",".join(map(str, no_overlap)))


if __name__ == '__main__':
    main()