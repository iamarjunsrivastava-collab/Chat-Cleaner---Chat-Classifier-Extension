import requests

URL = "http://127.0.0.1:5000/message"

def send_message(message):
    response = requests.post(URL, json={"message": message})
    try:
        print(f"Input: {message}")
        print("Response:", response.json())
        print("-" * 40)
    except Exception as e:
        print("Failed to parse JSON response:", response.text)

# Test 1: Normal message
send_message("Hello, this is a test message!")

# Test 2: Duplicate/similar message
send_message("Hello, this is a test msg!")

# Test 3: Toxic message (replace with any word your `is_toxic` filter would block)
send_message("You are an idiot")
