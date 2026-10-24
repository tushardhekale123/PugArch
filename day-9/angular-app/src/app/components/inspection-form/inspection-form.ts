import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Inspection {
  id: number;
  facilityName: string;
  inspectorName: string;
  inspectionDate: string;
  safetyScore: number;
  notes: string;
  status: string;
}

@Component({
  selector: 'app-inspection-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inspection-form.html',
  styleUrl: './inspection-form.css'
})
export class InspectionForm {
  @Output() inspectionAdded = new EventEmitter<Inspection>();

  facilityName = '';
  inspectorName = '';
  inspectionDate = new Date().toISOString().slice(0, 10);
  safetyScore = 80;
  notes = '';

  successMessage = '';
  errorMessage = '';

  submitInspection(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.facilityName.trim() || !this.inspectorName.trim()) {
      this.errorMessage = 'Please enter facility and inspector names.';
      return;
    }

    if (this.safetyScore < 0 || this.safetyScore > 100) {
      this.errorMessage = 'Safety score must be between 0 and 100.';
      return;
    }

    const inspection: Inspection = {
      id: Date.now(),
      facilityName: this.facilityName.trim(),
      inspectorName: this.inspectorName.trim(),
      inspectionDate: this.inspectionDate,
      safetyScore: Number(this.safetyScore),
      notes: this.notes.trim(),
      status: this.safetyScore >= 80 ? 'Safe' : 'Attention'
    };

    this.inspectionAdded.emit(inspection);
    this.successMessage = 'Inspection recorded successfully!';

    this.facilityName = '';
    this.inspectorName = '';
    this.safetyScore = 80;
    this.notes = '';
  }
}