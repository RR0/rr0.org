import { OpenGraphCommand } from './OpenGraphCommand';
import { rr0TestUtil } from './test/RR0TestUtil';

describe('OpenGraphCommand', () => {
  const outDir = '/out';

  test('time page', () => {
    const timeFile = '/time/0/0/6/5/index.html';
    const context = rr0TestUtil.newHtmlContext(timeFile, '');
    const command = new OpenGraphCommand(outDir, [timeFile]);
    expect(command.getInfoStr(context)).toBe('');
  });
});
