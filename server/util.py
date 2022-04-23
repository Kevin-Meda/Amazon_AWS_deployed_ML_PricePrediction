import pickle
import json
import numpy as np

__locations = None
__data_columns = None
__model = None

def get_estimated_price(location="Stuttgart", noRooms=3, noParkSpaces=0, petsAllowed=False, balcony=False, garden=False, newlyConst=False, livingSpace=50):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = noRooms
    x[1] = noParkSpaces
    x[2] = petsAllowed
    x[3] = balcony
    x[4] = garden
    x[5] = newlyConst
    x[6] = livingSpace

    if loc_index>=0:
        x[loc_index] = 1

    return round(__model.predict([x])[0],2)


def load_saved_artifacts():
    print("loading saved artifacts...start")
    global __data_columns
    global __locations

    with open("./artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[7:]  # first 3 columns are sqft, bath, bhk

    global __model
    if __model is None:
        with open('./artifacts/Germany_appartment_rent_cost_prediction.pickle', 'rb') as f:
            __model = pickle.load(f)
    print("loading saved artifacts...done")

def get_location_names():
    return __locations

def get_data_columns():
    return __data_columns

if __name__ == '__main__':
    load_saved_artifacts()
    '''print(get_location_names())
    print(get_estimated_price('Aachen', 2, 0, False, False, False, False, 50))
    print(get_estimated_price('Aachen', 2, 0, False, False, False, False, 100))
    print(get_estimated_price('Stuttgart', 2, 0, False, False, False, False, 50))
    print(get_estimated_price('Stuttgart', 2, 0, False, False, False, False, 50))'''
