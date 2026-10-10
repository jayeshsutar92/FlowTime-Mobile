import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Timer as TimerIcon, BarChart3, CheckCircle2, ChevronLeft } from 'lucide-react-native';
import { colors, radius, spacing } from '../theme';
import { ButtonLabel, Gradient, Press, PrimaryButton, Text } from '../components/ui';
import { Screen } from '../components/Screen';

const PAGES = [
  {
    title: 'Welcome to FlowTime',
    description: 'Your ultimate focus hub. Master your time and unlock deep work using personalized focus timers.',
    icon: <TimerIcon size={64} color={colors.primaryForeground} />,
  },
  {
    title: 'Track Productivity',
    description: 'Monitor your focus sessions, analyze weekly rhythms, and measure your productivity score effortlessly.',
    icon: <BarChart3 size={64} color={colors.primaryForeground} />,
  },
  {
    title: 'Ready to Flow?',
    description: 'Set your intentions, eliminate distractions, and start getting things done.',
    icon: <CheckCircle2 size={64} color={colors.primaryForeground} />,
  },
];

export function OnboardingScreen() {
  const navigation = useNavigation();
  const [page, setPage] = useState(0);

  const finish = async () => {
    try {
      await AsyncStorage.setItem('onboardingComplete', 'true');
    } catch (e) {
      // ignore
    }
    navigation.reset({ index: 0, routes: [{ name: 'Auth' }] });
  };

  const next = () => {
    if (page < PAGES.length - 1) {
      setPage(p => p + 1);
    } else {
      finish();
    }
  };

  const back = () => {
    if (page > 0) {
      setPage(p => p - 1);
    }
  };

  return (
    <Screen contentStyle={styles.container}>
      <View style={styles.header}>
        {page > 0 ? (
          <Press onPress={back} style={styles.backBtn} accessibilityLabel="Back">
            <ChevronLeft size={24} color={colors.mutedForeground} />
          </Press>
        ) : (
          <View style={styles.backBtnPlaceholder} />
        )}
      </View>

      <View style={styles.content}>
        <Gradient borderRadius={radius['3xl']} style={styles.iconContainer}>
          {PAGES[page].icon}
        </Gradient>
        <Text variant="display" size={28} center style={styles.title}>
          {PAGES[page].title}
        </Text>
        <Text size={16} color={colors.mutedForeground} center style={styles.description}>
          {PAGES[page].description}
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.indicators}>
          {PAGES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: i === page ? colors.primary : colors.muted },
              ]}
            />
          ))}
        </View>

        <PrimaryButton onPress={next} style={{ width: '100%' }}>
          <ButtonLabel>{page === PAGES.length - 1 ? 'Start Using FlowTime' : 'Next'}</ButtonLabel>
        </PrimaryButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: spacing['2xl'],
  },
  header: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backBtn: {
    padding: spacing.sm,
  },
  backBtnPlaceholder: {
    padding: spacing.sm,
    width: 40,
    height: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  iconContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  title: {
    marginBottom: spacing.md,
  },
  description: {
    lineHeight: 24,
  },
  footer: {
    alignItems: 'center',
    gap: spacing.xl,
  },
  indicators: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
