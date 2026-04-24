import { Component, computed, signal } from '@angular/core';
import { Header } from "./components/header/header";
import { Grid } from "./components/grid/grid";
import { Result } from "./components/result/result";
import { InputRow } from "./components/input/input";
import { Banner } from "./components/banner/banner";

const VALID_BASES = new Set(['A', 'T', 'G', 'C']);

interface DnaSnapshot {
  matrix: string[][];
  mutantCells: Set<string>;
  isMutant: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [Header, Grid, Result, InputRow, Banner],
})
export class App {
  dna = signal<string[]>([
    'ATGCGA',
    'CAGTGC',
    'TTATGT',
    'AGAAGG',
    'CCCCTA',
    'TCACTG',
  ]);

  matrix = computed(() => this.dna().map(row => row.toUpperCase().split('')));

  validationErrors = computed<string[]>(() => {
    const rows = this.dna();
    const n = rows.length;
    const errors: string[] = [];

    if (n === 0) {
      errors.push('La matriz no puede estar vacía.');
      return errors;
    }

    rows.forEach((row, i) => {
      const upper = row.toUpperCase();
      if (upper.length !== n) {
        errors.push(`Fila ${i + 1}: se esperaban ${n} caracteres, tiene ${upper.length}.`);
      }
      upper.split('').forEach((char, j) => {
        if (!VALID_BASES.has(char)) {
          errors.push(`Fila ${i + 1}, columna ${j + 1}: '${char}' no es una base válida (A, T, G, C).`);
        }
      });
    });

    return errors;
  });

  mutantCells = computed<Set<string>>(() => {
    if (this.validationErrors().length > 0) return new Set();

    const mat = this.matrix();
    const n = mat.length;
    const cells = new Set<string>();
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
    ];

    for (const [dr, dc] of directions) {
      for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
          const base = mat[r]?.[c];
          if (!base) continue;

          const seq: [number, number][] = [[r, c]];
          let valid = true;

          for (let k = 1; k < 4; k++) {
            const nr = r + dr * k;
            const nc = c + dc * k;
            if (nr < 0 || nr >= n || nc < 0 || nc >= n || mat[nr][nc] !== base) {
              valid = false;
              break;
            }
            seq.push([nr, nc]);
          }

          if (valid) seq.forEach(([sr, sc]) => cells.add(`${sr}-${sc}`));
        }
      }
    }

    return cells;
  });

  rowHasError = computed<boolean[]>(() => {
    const rows = this.dna();
    const n = rows.length;
    return rows.map(row => {
      const upper = row.toUpperCase();
      if (upper.length !== n) return true;
      return upper.split('').some(char => !VALID_BASES.has(char));
    });
  });

  snapshot = signal<DnaSnapshot | null>(null);

  isMutant = computed(() => this.mutantCells().size > 0);

  isValid = computed(() => this.validationErrors().length === 0);

  goBack(): void {
    this.snapshot.set(null);
  }

  analyze(): void {
    this.snapshot.set({
      matrix: this.matrix(),
      mutantCells: this.mutantCells(),
      isMutant: this.isMutant(),
    });
    this.dna.set(this.dna().map(() => ''));
  }

  updateRow(index: number, value: string): void {
    this.snapshot.set(null);
    this.dna.update(rows => rows.map((r, i) => i === index ? value : r));
  }

  addRow(): void {
    this.snapshot.set(null);
    this.dna.update(rows => [...rows, '']);
  }

  removeRow(index: number): void {
    this.snapshot.set(null);
    this.dna.update(rows => rows.filter((_, i) => i !== index));
  }
}
