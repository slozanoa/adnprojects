import { Component, Input, Output, EventEmitter } from '@angular/core';

const VALID_BASES = new Set(['A', 'T', 'G', 'C']);

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class InputRow {
  @Input() row = '';
  @Input() index = 0;
  @Input() hasError = false;
  @Input() canRemove = true;

  @Output() valueChange = new EventEmitter<string>();
  @Output() remove = new EventEmitter<void>();

  blockInvalidKey(event: KeyboardEvent): void {
    const controlKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Tab'];
    if (!VALID_BASES.has(event.key.toUpperCase()) && !controlKeys.includes(event.key) && !event.ctrlKey && !event.metaKey) {
      event.preventDefault();
    }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const pos = input.selectionStart ?? input.value.length;
    const upper = input.value.toUpperCase();
    input.value = upper;
    input.setSelectionRange(pos, pos);
    this.valueChange.emit(upper);
  }
}
