import time
import secrets
from random import randint
from datetime import datetime, timedelta
from flask import Flask, jsonify, request, make_response, request_finished, session
from flask_cors import CORS, cross_origin
from flaskext.mysql import MySQL
import requests
import json

application = Flask(__name__)
application.secret_key = "3XRAhZxTzilcfvk6rX8-ShqVAc_aWKnO9yw7MuLL6e0"
CORS(application, supports_credentials=True)

mysql = MySQL()
application.config['MYSQL_DATABASE_USER'] = 'u1221769_default'
application.config['MYSQL_DATABASE_PASSWORD'] = 'zU!8Puti'
application.config['MYSQL_DATABASE_DB'] = 'u1221769_userdatabase'
application.config['MYSQL_DATABASE_HOST'] = '31.31.198.39'
mysql.init_app(application)


@application.before_request
def make_session_permanent():
    session.permanent = True
    application.permanent_session_lifetime = timedelta(days=30)


def set_id():
    if request.method == "GET":
        return 0
    else:
        return request.get_json()["RestId"]


def set_rest(id):
    if id == 1:
        port = 11011
        token = "AXF0Qs7T5e0EjPjGg77g"
        return (port, token,)
    if id == 2:
        port = 11012
        token = "MZ5TjXn0PUyFYnnElv8r"
        return (port, token,)
    if id == 3:
        port = 11013
        token = "kVAHlDvsGd7MapvLLAnq"
        return (port, token,)
    if id == 4:
        port = 11014
        token = "ZMxYmUntDng6MLLInI0K"
        return (port, token)


def ping_rest(port, token):
    url = "http://78.110.158.255:" + str(port) + "/api/v2/ext/ping"
    headers = {"Token": token}
    r = requests.get(url, headers=headers, timeout=1)
    r_json = r.json()
    data = r_json["data"]
    return json.dumps(data)


def get_data_rest(port, token):
    url = "http://78.110.158.255:" + str(port) + "/api/v2/ext/getmenu"
    headers = {"Token": token}
    r = requests.get(url, headers=headers, timeout=1)
    r_json = r.json()
    data = r_json["data"]
    return data


def get_data_info():
    data_info = json.load(open("data.json"))
    data_info_categories = data_info["Categories"]
    data_info_restList = data_info["RestList"]
    data_info_menu = data_info["Menu"]
    data_info_modsAdds = data_info["ModsAdds"]
    data_sandwich_constructors = data_info["SandwichConstructors"]
    data_sandwich_adds_names = data_info["SandwichAddsNames"]
    return (data_info_categories, data_info_restList, data_info_menu, data_info_modsAdds, data_sandwich_constructors, data_sandwich_adds_names)


def get_rests():
    data_info = json.load(open("data.json"))
    data_info_restList = data_info["RestList"]
    return data_info_restList


def get_temp_menu(data_categories, data_rest):
    temp_menu = []
    for el1 in data_categories:
        for el2 in data_rest:
            if el2["categname"] == el1:
                temp_menu.append(el2)

    categories = []
    for el1 in temp_menu:
        if el1["categname"] in data_categories and el1["categname"] not in categories:
            categories.append(el1["categname"])

    return (temp_menu, categories)


def check_rest(port, token):
    ping_status = False
    try:
        ping_rest(port, token)
        ping_status = True
    except:
        ping_status = False
    return ping_status


def check_time(time1, time2):
    now = datetime.now()
    if time2 == "03:00":
        temp_date = now + timedelta(days=1)
        temp_date = temp_date.strftime("%Y-%m-%d")
        start = datetime.strptime(now.strftime(
            "%Y-%m-%d") + " " + time1 + ":00", "%Y-%m-%d %H:%M:%S")
        end = datetime.strptime(
            temp_date + " " + time2 + ":00", "%Y-%m-%d %H:%M:%S")
        start_unix = time.mktime(start.timetuple())
        end_unix = time.mktime(end.timetuple())
        return (start_unix < time.mktime(
            now.timetuple()) < end_unix)
    else:
        temp_date = now
        temp_date = temp_date.strftime("%Y-%m-%d")
        start = datetime.strptime(
            temp_date + " " + time1 + ":00", "%Y-%m-%d %H:%M:%S")
        end = datetime.strptime(
            temp_date + " " + time2 + ":00", "%Y-%m-%d %H:%M:%S")
        start_unix = time.mktime(start.timetuple())
        end_unix = time.mktime(end.timetuple())
        return (start_unix < time.mktime(
            now.timetuple()) < end_unix)


def check_rests():
    data = get_rests()
    for el in data:
        id = el["ID"]
        port, token = set_rest(id)
        if check_rest(port, token):
            time1 = el["Time1"]
            time2 = el["Time2"]
            el["RestStatus"] = True
            # el["RestStatus"] = check_time(time1, time2)
        else:
            el["RestStatus"] = False
    return data


def add_to_order_array(token, order_id, delivery, burg_len, sand_len, deliverat, rest_id):
    token = session["UserToken"]
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute(
        '''SELECT OrderArray FROM user_data WHERE Token = %s''',
        (token)
    )
    result = cursor.fetchall()[0][0]
    arr = []
    if result != None:
        temp_arr = json.loads(result)
        for el in temp_arr:
            arr.append(el)
    arr.append({
        "rest_id": rest_id,
        "order_id": order_id,
        "status": 00,
        "type": delivery,
        "deliverat": deliverat,
        "0": burg_len,
        "1": sand_len,
    })
    cursor.execute(
        '''UPDATE user_data SET OrderArray = %s WHERE Token = %s''',
        (json.dumps(arr), token)
    )
    conn.commit()
    cursor.close()


@application.route("/test", methods=["GET", "POST"])
def test():
    url = "http://78.110.158.255:" + str("11011") + "/api/v2/ext/getmenu"
    headers = {"Token": "AXF0Qs7T5e0EjPjGg77g"}
    r = requests.get(url, headers=headers, timeout=2)
    r_json = r.json()
    data = r_json["data"]
    return json.dumps(data)


@application.route('/api/0.1.0/getMenu', methods=['GET', 'POST'])
def get_menu():
    name_arr = []
    modsaddsarr = []

    rest_id = set_id()
    if not "RestId" in session:
        session["RestId"] = rest_id
    else:
        if rest_id != session["RestId"]:
            basket_list_temp = {"0": [], "1": []}
            session["RestId"] = rest_id
            session.modified = True
            session["basketList"] = basket_list_temp
            session.modified = True

    port, token = set_rest(rest_id)
    rest_list = check_rests()

    if rest_list[rest_id - 1]["RestStatus"]:
        try:
            data_rest = get_data_rest(port, token)
        except:
            return {
                "status": 0
            }
        data_categories, data_restList, data_menu, data_modsadds, data_sandwich_constructors, data_sandwich_adds_names = get_data_info()

        temp_menu, categories = get_temp_menu(data_categories, data_rest)

        response_menu = []

        restrict_array = []

        constructor_response = []

        temp_restrict_array = ["СЭНДВИЧ ОВОЩНОЙ",
                               "МИНИ ОВОЩНОЙ", "КЛАБ ОВОЩНОЙ", "РОЛЛ ОВОЩНОЙ"]

        for el1 in data_sandwich_constructors:
            for el2 in el1["content"]:
                restrict_array.append(el2)

        wrong_arr = []
        for el1 in data_sandwich_constructors:
            temp_constructor_array = []
            categname = ""
            rest = 1
            for el2 in temp_menu:
                if el2["name"] in el1["content"]:

                    mods = []
                    adds = []
                    add_price = 0
                    add_code = 0
                    add_name = ""
                    name = ""
                    categname = el2["categname"]

                    for el3 in data_menu:
                        if el3["name1"] in el2["name"]:
                            name = el3["name2"]

                    for el3 in el2["modifiers"]:
                        groupname = el3["groupname"]
                        for el4 in el3["items"]:
                            addsmods_name = ""
                            if el4["name"] not in modsaddsarr:
                                modsaddsarr.append(el4["name"])
                            for el5 in data_modsadds:
                                if el5["name1"] in el4["name"]:
                                    addsmods_name = el5["name2"]

                            if addsmods_name in data_sandwich_adds_names and addsmods_name in name:
                                add_price = el4["price"] // 100
                                add_code = el4["code"]
                                add_name = addsmods_name
                            else:
                                temp_moddifier = {
                                    "name": addsmods_name,
                                    "code": el4["code"],
                                    "price": el4["price"] // 100,
                                }
                                if "БЕЗ" in groupname:
                                    mods.append(temp_moddifier)
                                elif "ДОП" in groupname:
                                    adds.append(temp_moddifier)
                    temp_constructor_array.append({
                        "name": name,
                        "code": el2["code"],
                        "categname": el2["categname"],
                        "price": el2["price"] // 100,
                        "addname": add_name,
                        "addprice": add_price,
                        "addcode": add_code,
                        "addactive": False,
                        "addstatus": False,
                        "mods": mods,
                        "adds": adds,
                        "rest": rest,
                        "stop": el2["rests"]
                    })
            constructor_response.append({
                "name": el1["name"],
                "categname": categname,
                "rest": rest,
                "content": temp_constructor_array,
                "constructor": True
            })
        print(wrong_arr)

        sorted_menu = []

        for el1 in data_menu:
            for el2 in temp_menu:
                if el1["name1"] in el2["name"] and el2 not in sorted_menu:
                    sorted_menu.append(el2)

        for el1 in sorted_menu:

            mods = []
            adds = []
            rest = 1
            name = ""

            for el2 in data_menu:
                if el2["name1"] in el1["name"]:
                    name = el2["name2"]
                # else:
                #     if el1["name"] not in wrong_arr:
                #         wrong_arr.append(el1["name"])

            if "OLDSCHOOL BURGERS" in el1["categpath"]:
                rest = 0
            elif "SANDWICH STREET" in el1["categpath"]:
                rest = 1
            if el1["name"] not in restrict_array:
                for el2 in el1["modifiers"]:
                    groupname = el2["groupname"]
                    for el3 in el2["items"]:
                        addsmods_name = ""
                        if el3["name"] not in modsaddsarr:
                            modsaddsarr.append(el3["name"])
                        for el4 in data_modsadds:
                            if el4["name1"] in el3["name"]:
                                addsmods_name = el4["name2"]

                        temp_moddifier = {
                            "name": addsmods_name,
                            "code": el3["code"],
                            "price": el3["price"] // 100,
                        }
                        if "БЕЗ" in groupname:
                            mods.append(temp_moddifier)
                        elif "ДОП" in groupname:
                            adds.append(temp_moddifier)

                response_menu.append({
                    "name": name,
                    "code": el1["code"],
                    "categname": el1["categname"],
                    "price": el1["price"] // 100,
                    "mods": mods,
                    "adds": adds,
                    "rest": rest,
                    "stop": el1["rests"],
                    "constructor": False
                })
                name_arr.append(el1["name"])

        temparr = []

        for el in modsaddsarr:
            temparr.append(el.replace("- без", "").replace("- доп", ""))

        for el in constructor_response:
            response_menu.append(el)

        return json.dumps({
            "RestId": rest_id,
            "RestStatus": True,
            "RestList": rest_list,
            "Categories": categories,
            "Menu": response_menu,
        })
    else:
        return json.dumps({
            "RestId": rest_id,
            "RestStatus": False,
            "RestList": rest_list,
        })


@application.route("/api/0.1.0/addToBasket", methods=['GET', 'POST'])
def add_to_basket():
    basket_list_temp = {}

    if not "basketList" in session:
        basket_list_temp = {"0": [], "1": []}
    else:
        basket_list_temp = session["basketList"]

    request_dish = request.get_json()["Order"]

    if request_dish["rest"] == 0:
        basket_list_temp["0"].append(request_dish)
    if request_dish["rest"] == 1:
        basket_list_temp["1"].append(request_dish)

    if not "basketList" in session:
        session["basketList"] = basket_list_temp
    else:
        session["basketList"] = basket_list_temp
        session.modified = True

    return json.dumps(basket_list_temp)


@application.route("/api/0.1.0/editBasket", methods=["GET", "POST"])
def edit_basket():
    basket_list_temp = {}

    if not "basketList" in session:
        basket_list_temp = {"0": [], "1": []}
        session["basketList"] = basket_list_temp
        session.modified = True
        return json.dumps(basket_list_temp)
    else:
        basket_list_temp = session["basketList"]

    request_rest = request.get_json()["RestId"]
    request_index = request.get_json()["Index"]
    request_method = request.get_json()["Method"]
    if request_method == 0:
        basket_list_temp[str(request_rest)][request_index]["count"] = basket_list_temp[str(
            request_rest)][request_index]["count"] + 1
        basket_list_temp[str(request_rest)][request_index]["price"] = basket_list_temp[str(
            request_rest)][request_index]["priceOne"] * basket_list_temp[str(request_rest)][request_index]["count"]

    if request_method == 1:
        if basket_list_temp[str(request_rest)][request_index]["count"] > 1:
            basket_list_temp[str(request_rest)][request_index]["count"] = basket_list_temp[str(
                request_rest)][request_index]["count"] - 1
            basket_list_temp[str(request_rest)][request_index]["price"] = basket_list_temp[str(
                request_rest)][request_index]["priceOne"] * basket_list_temp[str(request_rest)][request_index]["count"]
        else:
            del basket_list_temp[str(request_rest)][request_index]

    session["basketList"] = basket_list_temp
    session.modified = True

    return json.dumps(basket_list_temp)


@application.route("/api/0.1.0/getBasket", methods=['GET', 'POST'])
def get_basket():
    basket_list_temp = {}

    if not "basketList" in session:
        basket_list_temp = {"0": [], "1": []}
        session["basketList"] = basket_list_temp
        session.modified = True
    else:
        basket_list_temp = session["basketList"]

    return json.dumps(basket_list_temp)


# @application.route("/api/0.1.0/postOrder", methods=["POST"])
# def post_order():
#     return secrets.token_hex(16)


@application.route("/api/0.1.0/sendCode", methods=["POST"])
def send_code():
    number = "8" + request.get_json()["number"]
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute(
        '''SELECT * FROM user_data WHERE Phone = %s''', (number))
    arr = []
    for el in cursor:
        arr.append({
            "number": el[1],
            "code": el[2]
        })
    code = randint(100000, 999999)
    if len(arr) > 0:
        cursor.execute(
            '''UPDATE user_data SET Code = %s WHERE Phone = %s''',
            (code, number)
        )
        conn.commit()
        cursor.close()
    else:
        cursor.execute(
            '''INSERT INTO user_data (Phone, Code) VALUES (%s, %s)''',
            (number, code)
        )
        conn.commit()
        cursor.close()
    return {
        "status": 1,
        "code": code
    }


@application.route("/api/0.1.0/checkCode", methods=["POST"])
def check_code():
    number = "8" + request.get_json()["number"]
    code = request.get_json()["code"]
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute(
        '''SELECT Code FROM user_data WHERE Phone = %s''',
        (number)
    )
    arr = []
    for el in cursor:
        arr.append(el[0])

    if len(arr) == 1:
        if code == arr[0]:
            token = secrets.token_hex(8)
            print(token)
            session["UserToken"] = token
            session.modified = True
            cursor.execute(
                '''UPDATE user_data SET Code = null, Token = %s WHERE Phone = %s''',
                (token, number)
            )
            conn.commit()
            cursor.close()
            return {
                "status": 1
            }
        else:
            cursor.close()
            return {
                "status": 0
            }
    else:
        return {
            "status": -1
        }


@application.route("/api/0.1.0/getUserData", methods=["GET"])
def get_user_data():
    if not "UserToken" in session:
        return {
            "status": 0
        }
    else:
        token = session["UserToken"]
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute(
            '''SELECT * FROM user_data WHERE Token = %s''',
            (token)
        )
        arr = []
        for el in cursor:
            arr.append(el)
        print(len(arr))

        if len(arr) == 1:
            address_array = []
            if arr[0][7] != None:
                address_array = json.loads(arr[0][7])
            return {
                "Phone": arr[0][1],
                "Name": arr[0][5],
                "Email": arr[0][6],
                "AddressArray": address_array,
                "status": 1
            }
        else:
            return {
                "status": -1
            }


@application.route("/api/0.1.0/editUserData", methods=["POST"])
def edit_user_data():
    name = request.get_json()["Name"]
    email = request.get_json()["Email"]
    phone = request.get_json()["Phone"]

    token = session["UserToken"]
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute(
        '''SELECT * FROM user_data WHERE Token = %s''',
        (token)
    )
    arr = []
    for el in cursor:
        arr.append(el)
    if len(arr) == 1:
        temp_phone = arr[0][1]
        if phone == temp_phone:
            cursor.execute(
                '''UPDATE user_data SET Name = %s, Email = %s WHERE Phone = %s''',
                (name, email, phone)
            )
            conn.commit()
            cursor.close()
            return {
                "status": 1
            }
        else:
            return {
                "status": 0
            }
    else:
        return {
            "status": -1
        }


@application.route("/api/0.1.0/deleteUserData", methods=["GET"])
def delete_user_data():
    del session["UserToken"]
    return {
        "status": 1
    }


@application.route("/api/0.1.0/addAddress", methods=["POST"])
def add_address():
    address = request.get_json()["Address"]
    comment = request.get_json()["Comment"]
    token = session["UserToken"]
    if len(address) > 4:
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute(
            '''SELECT AddressArray FROM user_data WHERE Token = %s''',
            (token)
        )
        result = cursor.fetchall()[0][0]
        arr = []
        if result != None:
            temp_arr = json.loads(result)
            for el in temp_arr:
                arr.append(el)
        arr.append({
            "Address": address,
            "Comment": comment
        })
        cursor.execute(
            '''UPDATE user_data SET AddressArray = %s WHERE Token = %s''',
            (json.dumps(arr), token)
        )
        conn.commit()
        cursor.close()
        return {
            "status": 1
        }
    else:
        return {
            "status": 0
        }


@application.route("/api/0.1.0/deleteAddress", methods=["POST"])
def delete_address():
    index = request.get_json()["Index"]
    token = session["UserToken"]
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute(
        '''SELECT AddressArray FROM user_data WHERE Token = %s''',
        (token)
    )
    result = cursor.fetchall()[0][0]
    arr = []
    if result != None:
        temp_arr = json.loads(result)
        for el in temp_arr:
            arr.append(el)
    del arr[index]
    cursor.execute(
        '''UPDATE user_data SET AddressArray = %s WHERE Token = %s''',
        (json.dumps(arr), token)
    )
    conn.commit()
    cursor.close()
    return {
        "status": 1
    }


@application.route("/api/0.1.0/validateBasket", methods=["POST"])
def validate_basket():
    print(request.get_json())
    rest_id = request.get_json()["RestId"]
    delivery = request.get_json()["Delivery"]
    basket_list = session["basketList"]
    burg_list = basket_list["0"]
    sand_list = basket_list["1"]
    content_temp = []
    for el1 in burg_list:
        modifiers_temp = []
        for el2 in el1["adds"]:
            modifiers_temp.append({
                "code": el2["code"],
                "count": el2["count"]
            })
        for el2 in el1["mods"]:
            modifiers_temp.append({
                "code": el2["code"],
                "count": 1
            })
        temp_dish = {
            "code": el1["code"],
            "quantity": el1["count"],
            "modifiers": modifiers_temp
        }
        content_temp.append(temp_dish)
    for el1 in sand_list:
        modifiers_temp = []
        for el2 in el1["adds"]:
            modifiers_temp.append({
                "code": el2["code"],
                "count": el2["count"]
            })
        for el2 in el1["mods"]:
            modifiers_temp.append({
                "code": el2["code"],
                "count": 1
            })
        temp_dish = {
            "code": el1["code"],
            "quantity": el1["count"],
            "modifiers": modifiers_temp
        }
        content_temp.append(temp_dish)
    request_data = {
        "type": delivery,
        "content": content_temp
    }
    print(request_data)
    port, token = set_rest(rest_id)
    url = "http://78.110.158.255:" + str(port) + "/api/v2/ext/validate"
    headers = {"Token": token}
    r = requests.post(url, headers=headers,
                      data=json.dumps(request_data), timeout=1)
    r_json = r.json()
    data = r_json
    return json.dumps(data)


@application.route("/api/0.1.0/basketAccess", methods=["POST"])
def check_access_basket():
    if "basketList" in session:
        status = True
        basket_list = session["basketList"]
        burg_list = basket_list["0"]
        sand_list = basket_list["1"]
        if len(burg_list) <= 0 and len(sand_list) <= 0:
            status = False
            return {
                "status": 0
            }
        else:
            return {
                "status": 1
            }
    else:
        return {
            "status": -1
        }


@application.route("/api/0.1.0/orderAccess", methods=["POST"])
def check_access_order():
    if "UserToken" in session and "basketList" in session:
        number = request.get_json()["Phone"]
        token = session["UserToken"]

        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute(
            '''SELECT Phone FROM user_data WHERE Token = %s''',
            (token)
        )
        phone = cursor.fetchall()[0][0]
        if number == phone:
            basket_list = session["basketList"]
            burg_list = basket_list["0"]
            sand_list = basket_list["1"]
            if len(burg_list) <= 0 and len(sand_list) <= 0:
                status = False
                return {
                    "status": 0
                }
            else:
                return {
                    "status": 1
                }
    else:
        return {
            "status": -1
        }


@application.route("/api/0.1.0/historyAccess", methods=["POST"])
def check_access_history():
    if "UserToken" in session and "basketList" in session:
        number = request.get_json()["Phone"]
        token = session["UserToken"]

        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute(
            '''SELECT Phone FROM user_data WHERE Token = %s''',
            (token)
        )
        phone = cursor.fetchall()[0][0]
        if number == phone:
            return {
                "status": 1
            }
    else:
        return {
            "status": -1
        }


@application.route("/api/0.1.0/postOrder", methods=["POST"])
def post_order():
    if "UserToken" in session and "basketList" in session:
        token = session["UserToken"]

        rest_id = request.get_json()["RestId"]
        delivery = request.get_json()["Delivery"]
        name = request.get_json()["Name"]
        number = request.get_json()["Phone"]
        address = request.get_json()["Address"]
        comment = request.get_json()["Comment"]

        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute(
            '''SELECT Phone FROM user_data WHERE Token = %s''',
            (token)
        )
        phone = cursor.fetchall()[0][0]
        if number == phone:
            basket_list = session["basketList"]
            basket_list_temp = {"0": [], "1": []}
            session["basketList"] = basket_list_temp
            session.modified = True
            burg_list = basket_list["0"]
            sand_list = basket_list["1"]
            now = datetime.now()
            deliverat = (now + timedelta(minutes=30)
                         ).strftime("%Y-%m-%d %H:%M:%S"),
            deliverat = deliverat[0]
            if len(burg_list) <= 0 and len(sand_list) <= 0:
                status = False
                return {
                    "status": 0
                }
            else:
                content_temp = []
                for el1 in burg_list:
                    modifiers_temp = []
                    for el2 in el1["adds"]:
                        modifiers_temp.append({
                            "code": el2["code"],
                            "count": el2["count"]
                        })
                    for el2 in el1["mods"]:
                        modifiers_temp.append({
                            "code": el2["code"],
                            "count": 1
                        })
                    temp_dish = {
                        "code": el1["code"],
                        "quantity": el1["count"],
                        "modifiers": modifiers_temp
                    }
                    content_temp.append(temp_dish)
                for el1 in sand_list:
                    modifiers_temp = []
                    for el2 in el1["adds"]:
                        modifiers_temp.append({
                            "code": el2["code"],
                            "count": el2["count"]
                        })
                    for el2 in el1["mods"]:
                        modifiers_temp.append({
                            "code": el2["code"],
                            "count": 1
                        })
                    temp_dish = {
                        "code": el1["code"],
                        "quantity": el1["count"],
                        "modifiers": modifiers_temp
                    }
                    content_temp.append(temp_dish)
                request_data = {
                    "guest": {
                        "sname": name,
                        "phone": phone,
                        "address": address,
                    },
                    "order": {
                        "type": delivery,
                        "comment": comment,
                        "deliverat": deliverat,
                        "content": content_temp
                    }
                }
                port, token = set_rest(rest_id)
                url = "http://78.110.158.255:" + \
                    str(port) + "/api/v2/ext/postorder"
                headers = {"Token": token}
                r = requests.post(url, headers=headers,
                                  data=json.dumps(request_data), timeout=1)
                r_json = r.json()
                data = r_json
                if data["result"]:
                    basket_list_temp = {"0": [], "1": []}
                    session["basketList"] = basket_list_temp
                    session.modified = True
                    add_to_order_array(session["UserToken"], data["order_id"], delivery, len(
                        burg_list), len(sand_list), deliverat, rest_id)
                    return json.dumps({"status": 1, "order_id": data["order_id"]})
                else:
                    return json.dumps({"data": data, "request": request_data})


@application.route('/api/0.1.0/clearBasket', methods=["GET"])
def clear_basket():
    basket_list_temp = {"0": [], "1": []}
    session["basketList"] = basket_list_temp
    session.modified = True

    return json.dumps(basket_list_temp)


# @application.route("/api/0.1.0/getHistoryStatus", ["POST"])
# def get_history_status():
#     order_list = request.get_json()["OrderList"]
#     list_status = []
#     for el in order_list:
#         if el["status"][0] != 3 or el["status"][0] != 4:
#             port, token = set_rest(el["rest_id"])
#             url = "http://78.110.158.255:" + \
#                 str(port) + "/api/v2/ext/orderstate?order_id=" + el["order_id"]
#             headers = {"Token": token}
#             r = requests.get(url, headers=headers, timeout=1)
#             r_json = r.json()
#             data = r_json
#             if data["result"]:
#                 list_status.append(data["order"])
#     print(list_status)
#     return json.dumps(list_status)


if __name__ == "__main__":
    application.run()
