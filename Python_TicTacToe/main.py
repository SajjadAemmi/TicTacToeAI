import math

ply = "X"
winner = None

def isGoal(state):
    for i in range(3):
        if state.data[i][0] == state.data[i][1] == state.data[i][2] == "X" or state.data[0][i] == state.data[1][i] == state.data[2][i] == "X":
            return "X"

        if state.data[i][0] == state.data[i][1] == state.data[i][2] == "O" or state.data[0][i] == state.data[1][i] == state.data[2][i] == "O":
            return "O"

    if state.data[0][0] == state.data[1][1] == state.data[2][2] == "X" or state.data[0][2] == state.data[1][1] == state.data[2][0] == "X":
        return "X"

    if state.data[0][0] == state.data[1][1] == state.data[2][2] == "O" or state.data[0][2] == state.data[1][1] == state.data[2][0] == "O":
        return "O"

    for i in range(3):
        for j in range(3):
            if state.data[i][j] is None:
                return None

    return "Draws"

def show_result(game):
    for i in range(3):
        for j in range(3):
            if game.data[i][j] == None:
                print('-',end='')
            else:
                print(game.data[i][j],end='')
        print()
        




class Node(object):

    data = [[None for _ in range(3)] for _ in range(3)]


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

def startGame():

    global ply
    global winner

    root = Node()

    while winner == None:

        if ply == "X":
            x = int(input("input row: "))
            y = int(input("input col: "))
            while x>2 or x<0 or y>2 or y<0 :
                print("Error,enter row and col between 0 to 2")
                x = int(input("input row: "))
                y = int(input("input col: "))

            while root.data[x][y] is not None  :
                print("Error, this cell is full")
                x = int(input("input row: "))
                y = int(input("input col: "))

            root.data[x][y] = "X"

            ply = "O"

        elif ply == "O":
            x, y = AITree(root)
            root.data[x][y] = "O"
            print('PC turn : ')
            ply = "X"
        show_result(root)
        winner = isGoal(root)

    print(winner)

startGame()
