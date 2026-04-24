import { Component, input } from '@angular/core';

const BASE_COLORS: Record<string, string> = {
  A: 'text-blue-600',
  T: 'text-emerald-600',
  G: 'text-amber-500',
  C: 'text-violet-600',
};

@Component({
  selector: 'app-grid',
  imports: [],
  templateUrl: './grid.html',
  styleUrl: './grid.css',
})
export class Grid {
  matrix = input.required<string[][]>();
  mutantCells = input.required<Set<string>>();

  cellClasses(row: number, col: number, base: string): string {
    const mutant = this.mutantCells().has(`${row}-${col}`);
    const color = BASE_COLORS[base] ?? 'text-gray-600';
    const bg = mutant
      ? 'bg-red-100 border-red-400 shadow-inner'
      : 'bg-white border-gray-200 hover:bg-gray-50';
    return `${color} ${bg} flex items-center justify-center w-11 h-11 border-2 rounded-lg font-mono font-bold text-lg transition-colors duration-150 select-none`;
  }

  trackRow(_: number, row: string[]) {
    return row.join('');
  }

  trackCell(_: number, cell: string) {
    return cell;
  }
}
