import re

def main():
  print(part_1())
  print(part_2())


def part_1():
  sum = 0
  for rucksack in input:
    compartments = re.findall(f".{{1,{len(rucksack) // 2}}}", rucksack)
    sum += get_char_value(''.join(set(compartments[0]) & set(compartments[1])))

  return sum


def part_2():
  sum = 0
  groups = [input[i:i+3] + [None] * (3 - len(input[i:i+3])) for i in range(0, len(input), 3)]
  for group in groups:
    sum += get_char_value(''.join(set(group[0]) & set(group[1]) & set(group[2])))

  return sum


def setup(path):
  global input

  with open(path, 'r') as file:
    input = [row.rstrip('\n') for row in file]


def get_char_value(c):
  return ord(c) - (ord(c) > 96 and 96 or 38)


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()