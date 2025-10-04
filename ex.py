from pydantic import BaseModel, Field, ValidationError

class Product(BaseModel):
    id: int
    name: str = Field(min_length=3)

try:
    # Wrong type for id (string instead of int)
    Product(id="abc", name="Laptop")
except ValidationError as e:
    print("Case 1:", e)

try:
    # Missing required field `id`
    Product(name="Laptop")
except ValidationError as e:
    print("Case 2:", e)

try:
    # Constraint violation (too short)
    Product(id=1, name="PC")
except ValidationError as e:
    print("Case 3:", e)
