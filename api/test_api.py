from flask import Flask, make_response, request
from flask_cors import CORS, cross_origin
from datetime import datetime
from datetime import timedelta
import requests
import json

application = Flask(__name__)
CORS(application, supports_credentials=True)
application.debug = True

config = {
    "user": "u1221769_default",
    "password": "zU!8Puti",
    "host": "31.31.198.39",
    "database": "u1221769_userdatabase",
    "raise_on_warnings": True,
}


@application.route("/api/v1/postOrder", methods=["GET", "POST"])
def postOrder():
    req = 1
    req = request.get_json()["RestId"]
    delivery_status = request.get_json()["DeliveryStatus"]
    port = ""
    token = ""

    if req == 1:
        port = 11011
        token = "AXF0Qs7T5e0EjPjGg77g"
    if req == 2:
        port = 11012
        token = "MZ5TjXn0PUyFYnnElv8r"
    if req == 3:
        port = 11013
        token = "kVAHlDvsGd7MapvLLAnq"
    if req == 4:
        port = 11014
        token = "ZMxYmUntDng6MLLInI0K"

    data = request.get_json()["Order"]
    funcData = []

    for el in data["adds"]:
        funcData.append({"code": el["code"], "name": el["name"], "count": el["count"]})

    for el in data["mods"]:
        funcData.append({"code": el["code"], "name": el["name"], "count": 1})

    newData = {
        "guest": {"sname": "Тестовый", "phone": "+79187060980", "address": "ул. Доватора 31, к1"},
        "order": {
            "type": delivery_status,
            "Comment": "Тестовый заказ САМОВЫВОЗ",
            "deliverat": str(format(datetime.now() + timedelta(minutes=30), "%Y-%m-%d %H:%M:%S")),
            "content": [{"name": data["name"], "code": data["code"], "quantity": data["count"], "modifiers": funcData}],
        },
    }

    url = "http://78.110.158.255:" + str(port) + "/api/v2/ext/postorder"
    headers = {"Token": token}
    r = requests.post(url, data=json.dumps(newData), headers=headers)
    r_json = r.json()

    return json.dumps(r_json)


@application.route("/api/v1/test", methods=["GET", "POST"])
def text():
    req = 1
    if request.method == "GET":
        req = 1
    else:
        req = request.get_json()["RestId"]
    port = ""
    token = ""

    if req == 1:
        port = 11011
        token = "AXF0Qs7T5e0EjPjGg77g"
    if req == 2:
        port = 11012
        token = "MZ5TjXn0PUyFYnnElv8r"
    if req == 3:
        port = 11013
        token = "kVAHlDvsGd7MapvLLAnq"
    if req == 4:
        port = 11014
        token = "ZMxYmUntDng6MLLInI0K"

    url = "http://78.110.158.255:" + str(port) + "/api/v2/ext/getmenu"
    headers = {"Token": token}
    r = requests.get(url, headers=headers)
    r_json = r.json()
    data = r_json["data"]

    data_info = json.load(open("data.json"))

    return json.dumps(data_info)


@application.route("/api/v1/getMenu", methods=["GET", "POST"])
def getMenu():
    req = 1
    if request.method == "GET":
        req = 1
    else:
        req = request.get_json()["RestId"]
    port = ""
    token = ""

    if req == 1:
        port = 11011
        token = "AXF0Qs7T5e0EjPjGg77g"
    if req == 2:
        port = 11012
        token = "MZ5TjXn0PUyFYnnElv8r"
    if req == 3:
        port = 11013
        token = "kVAHlDvsGd7MapvLLAnq"
    if req == 4:
        port = 11014
        token = "ZMxYmUntDng6MLLInI0K"

    url = "http://78.110.158.255:" + str(port) + "/api/v2/ext/getmenu"
    headers = {"Token": token}
    r = requests.get(url, headers=headers)
    r_json = r.json()
    data = r_json["data"]
    data_info = json.load(open("data.json"))
    data_categories = data_info["Categories"]
    data_restinfo = data_info["RestList"]
    data_menu_names = data_info["Menu"]
    data_moddifiers_names = data_info["ModsAdds"]
    Categories = []
    temp_menu = []
    error_array = []

    for el1 in data_categories:
        for el2 in data:
            if el2["categname"] == el1:
                temp_menu.append(el2)

    for el1 in temp_menu:
        if el1["categname"] in data_categories:
            if el1["categname"] not in Categories:
                Categories.append(el1["categname"])

    response_dict = {"Categories": Categories, "RestList": data_restinfo, "Menu": []}
    for el1 in temp_menu:
        name = ""
        code = el1["code"]
        price = el1["price"] // 100
        categname = el1["categname"]
        mods = []
        adds = []

        temp_name = el1["name"]

        temp_modifiers = el1["modifiers"]

        for el2 in temp_modifiers:
            groupname = el2["groupname"]
            temp_moddifier_array = []
            for el3 in el2["items"]:
                moddifier_name = ""
                moddifier_code = el3["code"]
                moddifier_price = el3["price"] // 100

                temp_moddifier_name = el3["name"]

                temp_moddifier = {"name": temp_moddifier_name, "code": moddifier_code, "price": moddifier_price}

                if "БЕЗ" in groupname:
                    mods.append(temp_moddifier)
                if "ДОП" in groupname:
                    adds.append(temp_moddifier)

        temp_dish = {"name": temp_name, "code": code, "categname": categname, "price": price}

        temp_dish["mods"] = mods
        temp_dish["adds"] = adds

        response_dict["Menu"].append(temp_dish)

    return json.dumps(response_dict, ensure_ascii=False)


if __name__ == "__main__":
    application.run(debug=True)
