from collections import defaultdict

def main():
  print(part_1())
  print(part_2())


def part_1():
  return sum(int(i[len(i) // 2]) if not any(a in i and b in i and i.index(a) > i.index(b) for a, b in rules) else 0 for i in updates)


def part_2():
  dict = defaultdict(set)
  for a, b in rules:
    dict[a].add(b)
  ans = 0
  for i in updates:
    if any(a in i and b in i and i.index(a) > i.index(b) for a, b in rules):
      i = sorted({j: dict[j] & set(i) for j in i}, key=lambda k: len({j: dict[j] & set(i) for j in i}[k]), reverse=True)
      ans += int(i[len(i) // 2])
  return ans


def setup(path):
  global rules, updates

  with open(path, 'r') as file:
    rules, updates = file.read().split("\n\n")
    rules = [i.split("|") for i in rules.splitlines()]
    updates = [i.split(",") for i in updates.splitlines()]


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()