from itertools import chain

def main():
    print(part_1())
    print(part_2())


def part_1():
    marked = set()
    for num in numbers:
        marked.add(num)

        for board in boards:
            if any(all(x in marked for x in row) for row in board) or any(all(row[columnIndex] in marked for row in board) for columnIndex in range(len(board[0]))):
                return num * sum(x for x in chain.from_iterable(board) if x not in marked)
            

def part_2():
    won = set()
    marked = set()
    for num in numbers:
        marked.add(num)

        for i in range(len(boards)):
            if i in won:
                continue
            
            b = boards[i]
            
            if any(all(x in marked for x in row) for row in b) or any(all(row[columnIndex] in marked for row in b) for columnIndex in range(len(b[0]))):
                won.add(i)
                
                if len(won) == len(boards):
                    return num * sum(x for row in b for x in row if x not in marked)
                

def setup(path):
    global numbers
    global boards
    
    with open(path, 'r') as file:
        input = file.read().split('\n\n')
        numbers = [int(num) for num in input[0].split(',')]
        boards = [[[int(cell) for cell in row.split()] for row in board.split('\n')] for board in input[1:]]


if __name__ == '__main__':
    setup('../puzzle.txt')
    main()