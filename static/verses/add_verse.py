import json

with open("verses\\verses.json", "r", encoding="UTF-8") as f:
    data = json.load(f)

book, chapter, verse = input().split(" ")
text = input()
add_word = {"index": {"book": book, "chapter": chapter, "verse": verse}, "text":text}
data["words"].append(add_word)
print(data)

with open("verses\\verses.json", "w", encoding="UTF-8") as f:
    json.dump(data, f, ensure_ascii=False)