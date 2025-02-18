from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI() 


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)


items = [{"id": 1, "name": "Item 1"}, {"id": 2, "name": "Item 2"}]


class Item(BaseModel):
    name: str

@app.get("/items")
def get_items():
    return items

@app.post("/items")
def add_item(item: Item):
    new_item = {"id": len(items) + 1, "name": item.name}
    items.append(new_item)
    return new_item

@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    global items
    items = [item for item in items if item["id"] != item_id]
    return {"message": "Deleted"}


if __name__ == "__main__":  
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)