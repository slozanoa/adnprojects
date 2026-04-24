import { Component, input } from '@angular/core';
import { Grid } from '../grid/grid';

@Component({
  selector: 'app-result',
  imports: [Grid],
  templateUrl: './result.html',
  styleUrl: './result.css',
})
export class Result {
  matrix = input.required<string[][]>();
  mutantCells = input.required<Set<string>>();
  isMutant = input.required<boolean>();
}
