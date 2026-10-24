# Queue Implementation

queue = []


def enqueue(value):
    queue.append(value)
    print(value, "added")


def dequeue():
    if len(queue) == 0:
        print("Queue is empty")
    else:
        value = queue.pop(0)
        print(value, "removed")


def front():
    if len(queue) == 0:
        print("Queue is empty")
    else:
        print("Front element:", queue[0])


enqueue(10)
enqueue(20)
enqueue(30)

front()
dequeue()
front()