import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to MindWell</Text>
      </View>
      
      <View style={styles.moodSection}>
        <Text style={styles.sectionTitle}>How are you feeling today?</Text>
        {/* Mood selector will be added */}
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        {/* Quick action buttons will be added */}
      </View>

      <View style={styles.insights}>
        <Text style={styles.sectionTitle}>Your Insights</Text>
        {/* Insights component will be added */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#34495e',
  },
  moodSection: {
    padding: 20,
  },
  quickActions: {
    padding: 20,
  },
  insights: {
    padding: 20,
  },
});

export default HomeScreen;
