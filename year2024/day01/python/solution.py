def main():
  print(part_1())
  print(part_2())


def part_1():
  return sum(abs(v - input[1][i]) for i, v in enumerate(input[0]))


def part_2():
  return sum(v * input[1].count(v) for v in input[0])


def setup(path):
    global input

    with open(path, 'r') as file:
        lines = file.read().strip().split('\n')
    
    input = [[], []]
    for line in lines:
      numbers = list(map(int, line.split()))
      for i, num in enumerate(numbers):
        input[i].append(num)

    input[:] = [sorted(arr) for arr in input]


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()