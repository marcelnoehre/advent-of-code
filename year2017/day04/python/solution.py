def main():
  print(part_1())
  print(part_2())


def part_1():
  return sum(len(set(passphrase)) == len(passphrase) for passphrase in input)


def part_2():
  return sum(len(set([''.join(sorted(word)) for word in [*passphrase]])) == len(passphrase) for passphrase in input)


def setup(path):
  global input

  with open(path, 'r') as file:
    input = [row.split(' ') for row in file.read().split('\n')]


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()