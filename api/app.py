from flask import Flask, request, render_template
from flask_cors import CORS
import boto3
from urllib.parse import urlparse
import os
import random
import string
from werkzeug.utils import redirect
application = Flask(__name__)
CORS(application)

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

name = 'movie-night'

table = dynamodb.Table(name)


@application.route('/api/add', methods=['POST', 'GET'])
def add_url():
    group = ""
    movie = {}
    query = request.get_json()
    try:
        query = request.get_json()
        group = query['group']
        movie = query['movie']
    except:
        return {
            'error':
            'Needs stuff in json'
        }, 400
    group = 'gamers'


    response = table.get_item(Key={'group-name': group})
    item = response['Item']

    if any(x for x in item['movies'] if x['name'] == movie['name']):
        return {'error': 'movie already suggested'}, 400
    item['movies'].append(movie)

    table.put_item(Item=item)
    return item

@application.route('/api/group/<id>', methods=['GET'])
def group(id):
    response = table.get_item(Key={'group-name': id})
    item = response['Item']
    return item

@application.route('/api/group/<id>', methods=['POST'])
def update_group(id):
    response = table.get_item(Key={'group-name': id})
    item = response['Item']
    query = request.get_json()
    movies = query['movies']
    nights = query['nights']

    table.put_item(Item={
        'group-name': id,
        'movies': movies,
        'nights': nights
    })
    return item
@application.route('/')
def index():
    return "Hello World"


if __name__ == '__main__':
    application.run(debug=True)