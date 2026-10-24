# Stack Implementation

stack = []


def push(value):
    stack.append(value)
    print(value, "pushed")


def pop():
    if len(stack) == 0:
        print("Stack is empty")
    else:
        value = stack.pop()
        print(value, "popped")


def peek():
    if len(stack) == 0:
        print("Stack is empty")
    else:
        print("Top element:", stack[-1])


push(10)
push(20)
push(30)

peek()
pop()
peek()