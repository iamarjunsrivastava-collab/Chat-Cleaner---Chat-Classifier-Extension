from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer, util
from filters.toxicity_filter import is_toxic
import torch

app = Flask(__name__)

model = SentenceTransformer('paraphrase-MiniLM-L6-v2')
similarity_threshold = 0.75
messages = []

@app.route('/message', methods=['POST'])
def handle_message():
    data = request.get_json()
    msg = data.get('message', '')

    if is_toxic(msg):
        return jsonify({'status': 'rejected', 'reason': 'toxic content'})

    for stored_msg in messages:
        sim_score = util.cos_sim(model.encode(msg, convert_to_tensor=True),
                                 model.encode(stored_msg, convert_to_tensor=True)).item()
        if sim_score > similarity_threshold:
            return jsonify({'status': 'rejected', 'reason': 'duplicate/similar message'})

    messages.append(msg)
    return jsonify({'status': 'accepted', 'message': msg})

if __name__ == '__main__':
    app.run(debug=True)
