from typing import Dict, List
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pydantic import BaseModel

class ChatResponse(BaseModel):
    response: str
    suggestions: List[str]
    sentiment: float

class ChatService:
    def __init__(self):
        # Initialize TF-IDF vectorizer
        self.vectorizer = TfidfVectorizer()
        
        # Pre-defined responses and suggestions
        self.responses: Dict[str, List[Dict[str, str]]] = {
            "greeting": [
                {"text": "Hello! How are you feeling today?", "context": "greeting"},
                {"text": "Hi there! I'm here to support you. How's your day going?", "context": "greeting"},
                {"text": "Welcome! How can I help you today?", "context": "greeting"}
            ],
            "stress": [
                {"text": "I hear that you're feeling stressed. Would you like to try a quick breathing exercise?", "context": "stress"},
                {"text": "It's normal to feel stressed sometimes. Let's talk about what's bothering you.", "context": "stress"},
                {"text": "I'm here to help you manage your stress. Would you like to explore some coping strategies?", "context": "stress"}
            ],
            "anxiety": [
                {"text": "I understand anxiety can be overwhelming. Let's work through this together.", "context": "anxiety"},
                {"text": "You're not alone in dealing with anxiety. Would you like to try some grounding techniques?", "context": "anxiety"},
                {"text": "I'm here to support you. Can you tell me more about what's making you anxious?", "context": "anxiety"}
            ],
            "depression": [
                {"text": "I'm here to listen without judgment. Would you like to talk about what you're experiencing?", "context": "depression"},
                {"text": "You're not alone in this. Have you considered talking to a mental health professional?", "context": "depression"},
                {"text": "Sometimes taking small steps can help. Would you like to explore some activities together?", "context": "depression"}
            ]
        }
        
        # Create a flat list of all responses for vectorization
        self.all_responses = []
        for responses in self.responses.values():
            self.all_responses.extend(responses)
            
        # Fit vectorizer on response texts
        self.vectorizer.fit([r["text"] for r in self.all_responses])
        
    async def process_message(self, user_id: str, message: str) -> ChatResponse:
        # Simple sentiment analysis using word lists
        positive_words = set(['happy', 'good', 'great', 'excellent', 'better', 'wonderful', 'calm', 'peaceful'])
        negative_words = set(['sad', 'bad', 'terrible', 'worse', 'awful', 'anxious', 'stressed', 'depressed'])
        
        words = message.lower().split()
        pos_count = sum(1 for word in words if word in positive_words)
        neg_count = sum(1 for word in words if word in negative_words)
        
        total_words = len(words)
        if total_words > 0:
            sentiment = (pos_count - neg_count) / total_words
        else:
            sentiment = 0.0
            
        # Find most similar response using TF-IDF and cosine similarity
        message_vector = self.vectorizer.transform([message])
        response_vectors = self.vectorizer.transform([r["text"] for r in self.all_responses])
        
        similarities = cosine_similarity(message_vector, response_vectors)[0]
        best_match_idx = np.argmax(similarities)
        response = self.all_responses[best_match_idx]["text"]
        
        # Generate contextual suggestions based on the response context
        context = self.all_responses[best_match_idx]["context"]
        suggestions = self._get_suggestions(context)
        
        return ChatResponse(
            response=response,
            suggestions=suggestions,
            sentiment=sentiment
        )
        
    def _get_suggestions(self, context: str) -> List[str]:
        """Get context-appropriate suggestions"""
        suggestions_map = {
            "greeting": [
                "Tell me more about your day",
                "Would you like to track your mood?",
                "Let's explore how you're feeling"
            ],
            "stress": [
                "Try deep breathing exercises",
                "Take a short walk",
                "Write in your journal"
            ],
            "anxiety": [
                "Practice grounding techniques",
                "Try progressive muscle relaxation",
                "Focus on your breathing"
            ],
            "depression": [
                "Set a small, achievable goal",
                "Connect with a friend or family member",
                "Consider professional support"
            ]
        }
        
        return suggestions_map.get(context, ["Track your mood", "Write in your journal", "Try relaxation exercises"])
