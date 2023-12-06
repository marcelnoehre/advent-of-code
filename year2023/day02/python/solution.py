def main():
  print(part_1())
  print(part_2())


def part_1():
  color_dict = { 'red': 12, 'green': 13, 'blue': 14 }
  return sum(int(row[1]) for row in input if all(int(row[i]) <= color_dict[row[i + 1]] for i in range(2, len(row), 2)))


def part_2():
  sum = 0
  for row in input:
    power_dict = {'red': 0,'green': 0,'blue': 0}

    for i in range(2, len(row), 2):
      if int(row[i]) > power_dict[row[i + 1]]:
        power_dict[row[i + 1]] = int(row[i])

    sum += (power_dict['red'] * power_dict['green'] * power_dict['blue'])

  return sum


def setup(path):
  global input

  with open(path, 'r') as file:
    input = [row.replace(':', '').replace(',', '').replace(';', '').split() for row in file.read().split('\n')]


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()