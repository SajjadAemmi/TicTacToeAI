import math


class Node(object):
    data = [[None for _ in range(3)] for _ in range(3)]


def isGoal(state):
    for letter in ["X", "O"]:
        for i in range(3):
            if state.data[i][0] == state.data[i][1] == state.data[i][2] == letter:
                return letter
            if state.data[0][i] == state.data[1][i] == state.data[2][i] == letter:
                return letter

        if state.data[0][0] == state.data[1][1] == state.data[2][2] == letter:
            return letter
        if state.data[0][2] == state.data[1][1] == state.data[2][0] == letter:
            return letter

    for i in range(3):
        for j in range(3):
            if state.data[i][j] is None:
                return None

    return "Draws"


def show_result(game):
    for i in range(3):
        for j in range(3):
            if game.data[i][j] == None:
                print('-', end='')
            else:
                print(game.data[i][j], end='')
        print()


def AITreeChildren(root, MinMax):
    if isGoal(root) == "X":
        return 1
    elif isGoal(root) == "O":
        return -1
    elif isGoal(root) == "Draws":
        return 0
    elif MinMax == "min":
        min = math.inf
        for i in range(3):
            for j in range(3):
                if root.data[i][j] is None:
                    child = Node()
                    child.data = root.data
                    child.data[i][j] = "O"
                    cost = AITreeChildren(child, "max")
                    child.data[i][j] = None
                    if cost < min:
                        min = cost
        return min

    elif MinMax == "max":
        max = -1 * math.inf
        for i in range(3):
            for j in range(3):
                if root.data[i][j] is None:
                    child = Node()
                    child.data = root.data
                    child.data[i][j] = "X"
                    cost = AITreeChildren(child, "min")
                    child.data[i][j] = None
                    if cost > max:
                        max = cost
        return max


def AITree(root):
    min = math.inf
    for i in range(3):
        for j in range(3):
            if root.data[i][j] is None:
                child = Node()
                child.data = root.data
                child.data[i][j] = "O"
                cost = AITreeChildren(child, "max")
                child.data[i][j] = None
                if cost < min:
                    min = cost
                    x, y = i, j
    return x, y


if __name__ == "__main__":
    ply = "X"
    winner = None

    root = Node()
    show_result(root)
    while winner == None:
        if ply == "X":
            while True:
                r = int(input("Row: "))
                c = int(input("Col: "))
                if 0 <= r <= 2 and 0 <= c <= 2:
                    if root.data[r][c] is None:
                        root.data[r][c] = "X"
                        break
                    else:
                        print("Error, This cell is full")
                else:
                    print("Error, Enter row and col between 0 to 2")
            ply = "O"
        
        elif ply == "O":
            print('AI is thinking... 🤔')
            r, c = AITree(root)
            root.data[r][c] = "O"
            ply = "X"

        show_result(root)
        winner = isGoal(root)
    print("Winner:", winner)
