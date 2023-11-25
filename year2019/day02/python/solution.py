def main():
  print(part_2())
  print(part_1())


def part_1():
  return simulate(input, 12, 2)


def part_2():
  input.pop()
  for noun in range(len(input)):
    for verb in range(len(input)):
      if simulate(input[:], noun, verb) == 19690720:
        return 100 * noun + verb


def setup(path):
  global input

  with open(path, 'r') as file:
    input = [int(num) for num in file.read().split(',')]


def simulate(codes, noun, verb):
  codes[1], codes[2] = noun, verb
  i = 0
  while codes[i] != 99:
    codes[codes[i + 3]] = codes[codes[i + 1]] + codes[codes[i + 2]] if codes[i] == 1 else codes[codes[i + 1]] * codes[codes[i + 2]]
    i += 4

  return codes[0]


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()