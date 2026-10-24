import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FacilityService, Facility } from './services/facility';
import { InspectionForm, Inspection } from './components/inspection-form/inspection-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, InspectionForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'Facility Inspection Dashboard';

  facilities: Facility[] = [];
  inspections: Inspection[] = [];

  searchText = '';
  selectedStatus = 'All';
  isLoading = false;
  errorMessage = '';

  constructor(private facilityService: FacilityService) {}

  ngOnInit(): void {
    this.loadFacilities();

    const saved = localStorage.getItem('facility-inspections');
    if (saved) {
      this.inspections = JSON.parse(saved);
    }
  }

  loadFacilities(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.facilityService.getFacilities().subscribe({
      next: (data: Facility[]) => {
        this.facilities = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load facilities. Please try again.';
        this.isLoading = false;
      }
    });
  }

  get filteredFacilities(): Facility[] {
    return this.facilities.filter(facility => {
      const search = this.searchText.toLowerCase();

      const matchesSearch =
        facility.name.toLowerCase().includes(search) ||
        facility.location.toLowerCase().includes(search);

      const matchesStatus =
        this.selectedStatus === 'All' ||
        facility.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  get totalFacilities(): number {
    return this.facilities.length;
  }

  get safeFacilities(): number {
    return this.facilities.filter(f => f.status === 'Safe').length;
  }

  get attentionFacilities(): number {
    return this.facilities.filter(f => f.status !== 'Safe').length;
  }

  get averageScore(): number {
    if (!this.facilities.length) return 0;

    const total = this.facilities.reduce(
      (sum, facility) => sum + facility.score,
      0
    );

    return Math.round(total / this.facilities.length);
  }

  addInspection(inspection: Inspection): void {
    this.inspections = [inspection, ...this.inspections];

    localStorage.setItem(
      'facility-inspections',
      JSON.stringify(this.inspections)
    );
  }
}