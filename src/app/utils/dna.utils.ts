const VALID_BASES = new Set(['A', 'T', 'G', 'C']);

export function isMutant(dna: string[]): boolean {
  if (!dna || dna.length === 0) return false;

  const n = dna.length;
  const matrix = dna.map(row => row.toUpperCase().split(''));

  for (let i = 0; i < n; i++) {
    if (matrix[i].length !== n) return false;
    for (let j = 0; j < n; j++) {
      if (!VALID_BASES.has(matrix[i][j])) return false;
    }
  }

  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  for (const [dr, dc] of directions) {
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        const base = matrix[r][c];
        let valid = true;

        for (let k = 1; k < 4; k++) {
          const nr = r + dr * k;
          const nc = c + dc * k;
          if (nr < 0 || nr >= n || nc < 0 || nc >= n || matrix[nr][nc] !== base) {
            valid = false;
            break;
          }
        }

        if (valid) return true;
      }
    }
  }

  return false;
}
