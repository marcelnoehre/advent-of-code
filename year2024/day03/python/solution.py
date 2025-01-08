import re

def main():
  print(part_1())
  print(part_2())


def part_1():
  return sum(int(x) * int(y) for x, y in re.findall(r"mul\((\d+),(\d+)\)", input))


def part_2():
  return sum(int(x) * int(y) if x and y else 0 for x, y in re.findall(r"(?s)(?:(?<=don't\(\)).*?(?=do\(\)|$))|(?:mul\((\d+),(\d+)\))", input))


def setup(path):
  global input

  with open(path, 'r') as file:
    input = file.read()
    

if __name__ == '__main__':
  setup('../puzzle.txt')
  main()