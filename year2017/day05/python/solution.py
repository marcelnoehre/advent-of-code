def main():
  print(part_1())
  print(part_2())


def part_1():
  return simulate(input[:], lambda offset: 1)


def part_2():
  return simulate(input[:], lambda offset: -1 if offset >= 3 else 1)


def setup(path):
  global input

  with open(path, 'r') as file:
    input = [int(num) for num in file.read().split('\n')]


def simulate(inst, offset_rule):
  ptr, jumps = 0, 0
  while 0 <= ptr < len(inst):
    inst[ptr], ptr, jumps = inst[ptr] + offset_rule(inst[ptr]), ptr + inst[ptr], jumps + 1

  return jumps


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()