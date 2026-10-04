/**
 * Base URL of the FlowTime Django backend.
 * Android emulator reaches the host machine at 10.0.2.2.
 * Change this to your deployed API URL for release builds.
 */
export const API_BASE_URL = __DEV__ ? 'http://10.0.2.2:8000' : 'https://your-flowtime-api.example.com';
