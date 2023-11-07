export abstract class CodeParser {

  parse(lines: string[]): void {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      lines[i] = this.parseLine(line);
    }
  }

  protected abstract parseLine(line: string): string;
}
