import json
import pandas as pd

# with open("verses\\verses.json", "r", encoding="UTF-8") as f:
#     data = json.load(f)

# book, chapter, verse = input().split(" ")
# text = input()
# add_word = {"index": {"book": book, "chapter": chapter, "verse": verse}, "text":text}
# data["words"].append(add_word)
# print(data)

verses_list = []

verses = pd.read_excel("C:/Users/user/Documents/카카오톡 받은 파일/올해의 말씀(2025).xlsx")
print(verses.head())

for row in verses.itertuples(index=False):
    book, index = row.장절.split(" ")
    chapter, v = index.split(":")
    verses_list.append({"index": {"book": book, "chapter": chapter, "verse": v}, "text": row._2})
print(verses_list[:5])

with open("verses.json", "w", encoding="UTF-8") as f:
    json.dump({"words": verses_list}, f, ensure_ascii=False)