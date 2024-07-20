export class NetworkUtil {
  // this util is used to check if user's network is fast or slow
  public static isFastNetwork(
    callback: (...args: any) => void,
    options: Partial<{
      timesToTest: number;
      threshold: number;
      image: string;
      allowEarlyExit: boolean;
    }>,
  ) {
    const defaultOptions = {
      timesToTest: 5,
      threshold: 200,
      image: 'https://www.google.com/images/phd/px.gif',
      allowEarlyExit: true,
    };

    const enrichedOptions = { ...defaultOptions, ...options };

    const testTimes: number[] = [];
    let tryCount = 0;
    const dummyImage = new Image();
    let isDismissed = false;

    // Recursively get average latency
    function testLatency(cb: (avgTime: number) => void) {
      if (enrichedOptions.allowEarlyExit) {
        setTimeout(() => {
          if (tryCount === 0) {
            tryCount = enrichedOptions.timesToTest;
            isDismissed = true;
            cb(enrichedOptions.threshold * 3 + 1);
          }
        }, enrichedOptions.threshold * 3);
      }

      const startTime = new Date().getTime();
      if (tryCount < enrichedOptions.timesToTest - 1) {
        dummyImage.src = `${enrichedOptions.image}?t=${startTime}`;
        dummyImage.onload = () => {
          const endTime = new Date().getTime();
          const timeTaken = endTime - startTime;
          testTimes[tryCount] = timeTaken;
          testLatency(cb);
          tryCount += 1;
        };
      } else {
        /** calculate average */
        const sum = testTimes.reduce((a, b) => a + b);
        const avg = sum / testTimes.length;
        if (!isDismissed) cb(avg);
      }
    }

    testLatency((avgInfo) => {
      callback(avgInfo <= enrichedOptions.threshold);
    });
  }
}
