# Practice: Classes and Objects

class Product:

    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity

    def total_price(self):
        return self.price * self.quantity


product1 = Product("Keyboard", 1200, 2)

print("Product Name:", product1.name)
print("Price:", product1.price)
print("Quantity:", product1.quantity)
print("Total Price:", product1.total_price())