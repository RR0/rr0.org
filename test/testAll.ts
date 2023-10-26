import { AnsiColor, TestError, TestRunner } from '@javarome/testscript';

const runner = new TestRunner();
runner.run().then(result => {
  const successCount = runner.successCount(result);
  let total = result.suites.length;
  let totalTime = runner.colored(`(${runner.durationStr(result.duration)})`, AnsiColor.white);
  const success = successCount === total;
  if (success) {
    runner.logger.log(runner.colored(`All ${total} test suites succeeded`, AnsiColor.green), totalTime);
  } else {
    const errorSummary = !success ? ', ' + runner.colored(`${total - successCount} failed`, AnsiColor.red) : '';
    runner.logger.log(`${successCount}/${total} test suites succeeded` + errorSummary, totalTime);
  }
  if (!success) {
    throw new TestError('Tests run failed');
  }
});
