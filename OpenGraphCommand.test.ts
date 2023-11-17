import { OpenGraphCommand } from './OpenGraphCommand';
import { rr0TestUtil } from './test/RR0TestUtil';
import { describe, expect, test } from '@javarome/testscript';

describe('OpenGraphCommand', () => {
  const outDir = '/out';

  test('time page', () => {
    const timeFile = 'time/0/0/6/5/index.html';
    const context = rr0TestUtil.newHtmlContext(timeFile, '');
    const command = new OpenGraphCommand(outDir, [timeFile], 'https://rr0.org');
    expect(command.getInfoStr(context)).toBe('Chronologie, RR0.org');
  });
});
