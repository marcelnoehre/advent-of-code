def main():
  print(part_1())
  print(part_2())


def part_1():
  return getMarker(input, 4)


def part_2():
  return getMarker(input, 14)


def setup(path):
  global input

  with open(path, 'r') as file:
    input = ([*file.read()])


def getMarker(input, length):
  return next((i + length for i, _ in enumerate(input[:-length]) if len(set(input[i:i+length])) == length), None)


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()