import requests

# Replace the URL with the address where your FastAPI application is running
url = "http://127.0.0.1:8000/predict/image"

# Path to the image file you want to upload
image_path = "jpg_1.jpg"

# Send a POST request with the image file
files = {'file': open(image_path, 'rb')}
response = requests.post(url, files=files)

# Define a dictionary to map class indices to labels
label_map = {
    0: 'Chef',
    1: 'Doctor',
    2: 'Engineer',
    3: 'Journalist',
    4: 'Lawyer',
    5: 'Nurse',
    6: 'Pilot ',
    7: 'Police',
    8: 'Professor'
}

# Print the response with labels
if response.status_code == 200:
    predictions = response.json()
    for prediction in predictions:
        class_index = int(prediction['class'])
        label = label_map.get(class_index, 'Unknown')
        print(f"Class: {label}, Confidence: {prediction['confidence']}")
else:
    print("Error:", response.text)

