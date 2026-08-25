import { usePostHog } from 'posthog-react-native';
import { useCallback } from 'react';

export function appEvents() {
    const posthog = usePostHog();

    /**
     * capture an event by name + payload
     * only runs if the PostHog client is ready
     */
    const captureEvent = useCallback(
        ({ eventName = '', payload = {} }) => {
            if (!posthog) {
                console.warn('🚨 PostHog client not initialized yet');
                return;
            }
            try {
                posthog.capture(eventName, payload);
                console.log(`✅ Event captured: ${eventName}`, payload);
            } catch (err) {
                console.error(`❌ Failed to capture ${eventName}:`, err);
            }
        },
        [posthog],
    );

    return { captureEvent };
}
