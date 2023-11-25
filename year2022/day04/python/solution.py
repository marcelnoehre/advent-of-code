def main():
  print(part_1())
  print(part_2())


def part_1():
  return len(list(filter(lambda pair: overlaps(pair[0], pair[1]), input)))


def part_2():
  return len(list(filter(lambda pair: contains(pair[0], pair[1]), input)))


def setup(path):
  global input

  with open(path, 'r') as file:
    input = [list(map(lambda tupel: list(map(int, tupel.split('-'))), group.split(','))) for group in file.read().split('\n')]


def overlaps(pair1, pair2):
  return (pair1[0] <= pair2[0] and pair1[1] >= pair2[1]) or (pair2[0] <= pair1[0] and pair2[1] >= pair1[1])


def contains(pair1, pair2):
  return ((pair1[0] >= pair2[0] and pair1[0] <= pair2[1]) or (pair2[0] >= pair1[0] and pair2[0] <= pair1[1]) or (pair1[1] <= pair2[1] and pair1[1] >= pair2[0]) or (pair2[1] <= pair1[1] and pair2[1] >= pair1[0]))


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()