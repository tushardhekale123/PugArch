# Practice: Inheritance

class Vehicle:

    def __init__(self, brand):
        self.brand = brand

    def show_brand(self):
        print("Brand:", self.brand)


class Car(Vehicle):

    def __init__(self, brand, model):
        super().__init__(brand)
        self.model = model

    def show_car(self):
        self.show_brand()
        print("Model:", self.model)


car1 = Car("Toyota", "Corolla")

car1.show_car()