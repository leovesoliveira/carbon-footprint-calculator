import { Amount } from './amount';
import { Unit } from './unit';

export class Measurement {
  constructor(
    public readonly amount: Amount,
    public readonly unit: Unit,
  ) {}
}
