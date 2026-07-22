import { Component, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsService } from './statistics.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements AfterViewInit {

  totalMembers = 0;
  totalCertificates = 0;
  activeCertificates = 0;
  expiredCertificates = 0;
  certifiedMembers = 0;

  private service = inject(StatisticsService);

  async ngAfterViewInit() {

    const [members, certs] = await Promise.all([
      this.service.getMembers(),
      this.service.getCertificates()
    ]);

    this.totalMembers = members.length;
    this.totalCertificates = certs.length;
    this.activeCertificates = certs.filter((c: any) => c.status === 'Active').length;
    this.expiredCertificates = certs.filter((c: any) => c.status === 'Expired').length;
    this.certifiedMembers = new Set(certs.map((c: any) => c.memberId)).size;

    // Status breakdown
    const statusCounts: Record<string, number> = {};
    certs.forEach((c: any) => {
      const s = c.status || 'Unknown';
      statusCounts[s] = (statusCounts[s] || 0) + 1;
    });

    // Certification type breakdown
    const typeCounts: Record<string, number> = {};
    certs.forEach((c: any) => {
      const t = c.certificationName || 'Unknown';
      typeCounts[t] = (typeCounts[t] || 0) + 1;
    });

    new Chart('statusChart', {
      type: 'pie',
      data: {
        labels: Object.keys(statusCounts),
        datasets: [{
          data: Object.values(statusCounts),
          backgroundColor: ['#4caf50', '#f44336', '#ff9800', '#9e9e9e']
        }]
      }
    });

    new Chart('typeChart', {
      type: 'bar',
      data: {
        labels: Object.keys(typeCounts),
        datasets: [{
          label: 'Certifications by Type',
          data: Object.values(typeCounts),
          backgroundColor: '#42a5f5'
        }]
      },
      options: {
        scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
      }
    });

  }

}
