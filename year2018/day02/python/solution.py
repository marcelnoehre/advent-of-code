def main():
  print(part_1())
  print(part_2())


def part_1():
  twice, thrice = 0, 0
  for row in input:
    counter = {}

    for c in row:
      counter[c] = counter.get(c, 0) + 1

    twice += 1 if 2 in counter.values() else 0
    thrice += 1 if 3 in counter.values() else 0

  return twice * thrice


def part_2():
  for x in range(len(input)):
    for y in range(len(input)):
      if x != y and len(input[x]) == len(input[y]):
        difference, position = 0, 0

        for z in range(len(input[x])):
          if input[x][z] != input[y][z]:
            position, difference = z, difference + 1

        if difference == 1:
          return (input[x][:position] + input[x][position + 1:]).rstrip()


def setup(path):
  global input

  with open(path, 'r') as file:
    input = [row for row in file]


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()