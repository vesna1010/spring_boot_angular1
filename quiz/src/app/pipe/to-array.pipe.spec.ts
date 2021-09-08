import { Answer } from "../enum/answer.enum";
import { Points } from "../enum/points.enum";
import { ToArrayPipe } from "./to-array.pipe";

describe('ToArrayPipeTest', () => {
  let pipe: ToArrayPipe;

  beforeEach(() => {
    pipe = new ToArrayPipe();
  });

  it('transform Answer to array of strings', () => {
    const array: string[] = pipe.transform(Answer, 'string');

    expect(array).toEqual(['A', 'B', 'C', 'D'])
  });

  it('transform Points to array of numbers', () => {
    const array: number[] = pipe.transform(Points, 'number');

    expect(array).toEqual([10, 20, 50, 100]);
  });

});