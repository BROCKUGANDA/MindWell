from typing import List, Dict, Any
from datetime import datetime, timedelta
import numpy as np
from app.models.mood import MoodLog
from app.models.journal import JournalEntry

class MoodAnalysisService:
    @staticmethod
    async def analyze_mood_trends(user_id: str, days: int = 30) -> Dict[str, Any]:
        """Analyze mood trends for the specified number of days"""
        start_date = datetime.utcnow() - timedelta(days=days)
        
        # Get mood logs for the period
        mood_logs = await MoodLog.find({
            "user.id": user_id,
            "created_at": {"$gte": start_date}
        }).to_list()
        
        if not mood_logs:
            return {
                "average_mood": None,
                "trend": "neutral",
                "common_activities": [],
                "recommendations": []
            }
            
        # Calculate statistics
        mood_scores = [log.score for log in mood_logs]
        average_mood = np.mean(mood_scores)
        
        # Determine trend
        if len(mood_scores) >= 2:
            slope = np.polyfit(range(len(mood_scores)), mood_scores, 1)[0]
            trend = "improving" if slope > 0.1 else "declining" if slope < -0.1 else "stable"
        else:
            trend = "neutral"
            
        # Analyze activities
        all_activities = []
        for log in mood_logs:
            all_activities.extend(log.activities)
            
        activity_counts = {}
        for activity in all_activities:
            activity_counts[activity] = activity_counts.get(activity, 0) + 1
            
        common_activities = sorted(
            activity_counts.items(),
            key=lambda x: x[1],
            reverse=True
        )[:5]
        
        # Generate recommendations
        recommendations = MoodAnalysisService._generate_recommendations(
            trend, [a[0] for a in common_activities]
        )
        
        return {
            "average_mood": round(average_mood, 2),
            "trend": trend,
            "common_activities": [a[0] for a in common_activities],
            "recommendations": recommendations
        }
    
    @staticmethod
    async def analyze_journal_sentiment(user_id: str, days: int = 30) -> Dict[str, Any]:
        """Analyze journal entries for sentiment and patterns"""
        start_date = datetime.utcnow() - timedelta(days=days)
        
        # Get journal entries for the period
        entries = await JournalEntry.find({
            "user.id": user_id,
            "created_at": {"$gte": start_date}
        }).to_list()
        
        if not entries:
            return {
                "total_entries": 0,
                "common_tags": [],
                "writing_streak": 0
            }
            
        # Analyze tags
        all_tags = []
        for entry in entries:
            all_tags.extend(entry.tags)
            
        tag_counts = {}
        for tag in all_tags:
            tag_counts[tag] = tag_counts.get(tag, 0) + 1
            
        common_tags = sorted(
            tag_counts.items(),
            key=lambda x: x[1],
            reverse=True
        )[:5]
        
        # Calculate writing streak
        dates = sorted([entry.created_at.date() for entry in entries])
        current_streak = 1
        max_streak = 1
        
        for i in range(1, len(dates)):
            if (dates[i] - dates[i-1]).days == 1:
                current_streak += 1
                max_streak = max(max_streak, current_streak)
            else:
                current_streak = 1
        
        return {
            "total_entries": len(entries),
            "common_tags": [t[0] for t in common_tags],
            "writing_streak": max_streak
        }
    
    @staticmethod
    def _generate_recommendations(trend: str, activities: List[str]) -> List[str]:
        """Generate personalized recommendations based on mood trend and activities"""
        recommendations = []
        
        if trend == "declining":
            recommendations.extend([
                "Consider scheduling a session with a mental health professional",
                "Try incorporating more physical activity into your routine",
                "Practice mindfulness or meditation daily"
            ])
        elif trend == "stable":
            recommendations.extend([
                "Keep up your current routine",
                "Try adding a new wellness activity to your schedule",
                "Share your progress with trusted friends or family"
            ])
        else:  # improving
            recommendations.extend([
                "Great progress! Keep maintaining your helpful habits",
                "Consider journaling about what's working well for you",
                "Share your successful strategies with others"
            ])
            
        return recommendations[:3]
