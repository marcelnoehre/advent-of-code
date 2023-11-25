def main():
  print(part_1())
  print(part_2())


def part_1():
  return len([pw for pw in map(str, range(input[0], input[1] + 1)) if len(set(pw)) < len(pw) and pw == ''.join(sorted(pw))])


def part_2():
  return len([pw for pw in map(str, range(input[0], input[1] + 1)) if pw == ''.join(sorted(pw)) and any(pw[i] == pw[i + 1] and (i == 0 or pw[i] != pw[i - 1]) and (i + 2 == len(pw) or pw[i] != pw[i + 2]) for i in range(len(pw) - 1))])


def setup(path):
  global input

  with open(path, 'r') as file:
    input = tuple(map(int, file.read().split('-')))


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()