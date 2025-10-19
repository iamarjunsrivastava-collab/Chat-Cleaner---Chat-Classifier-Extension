from detoxify import Detoxify

# Initialize Detoxify with the 'original' model for toxicity detection
tox_model = Detoxify('original')

def is_toxic(text):
    result = tox_model.predict(text)
    # Checking if toxicity exceeds a threshold (for example, 0.5 is the threshold)
    if result['toxicity'] > 0.25:
        return True
    return False
