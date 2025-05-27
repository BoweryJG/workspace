// Simple PDF export using browser print
export const exportToPDF = (report, doctor, product, location) => {
  // Create a new window with formatted content
  const printWindow = window.open('', '_blank');
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>RepSpheres Intelligence Report - ${doctor?.name || 'Doctor Report'}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.6;
          color: #1a1a1a;
          padding: 40px;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e5e7eb;
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #8A74F9 0%, #00D4FF 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 20px;
        }
        
        .logo-text {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
        }
        
        .date {
          color: #6b7280;
          font-size: 14px;
        }
        
        .report-header {
          background: linear-gradient(135deg, rgba(138, 116, 249, 0.1) 0%, rgba(0, 212, 255, 0.05) 100%);
          padding: 30px;
          border-radius: 12px;
          margin-bottom: 30px;
        }
        
        .doctor-info {
          margin-bottom: 20px;
        }
        
        .doctor-name {
          font-size: 28px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 8px;
        }
        
        .doctor-details {
          font-size: 16px;
          color: #6b7280;
          margin-bottom: 4px;
        }
        
        .score-badge {
          display: inline-block;
          background: #8A74F9;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
          margin-top: 12px;
        }
        
        .section {
          margin-bottom: 30px;
        }
        
        .section-title {
          font-size: 20px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .section-icon {
          width: 24px;
          height: 24px;
          background: #8A74F9;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 14px;
        }
        
        .insights-list {
          list-style: none;
          padding: 0;
        }
        
        .insight-item {
          padding: 12px 0;
          border-bottom: 1px solid #e5e7eb;
          position: relative;
          padding-left: 24px;
        }
        
        .insight-item:last-child {
          border-bottom: none;
        }
        
        .insight-item:before {
          content: "•";
          position: absolute;
          left: 0;
          color: #8A74F9;
          font-size: 20px;
          line-height: 1.2;
        }
        
        .next-steps {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        
        .step-chip {
          background: #f3f4f6;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
          border: 1px solid #e5e7eb;
        }
        
        .footer {
          margin-top: 60px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          color: #6b7280;
          font-size: 12px;
        }
        
        @media print {
          body {
            padding: 20px;
          }
          
          .report-header {
            break-inside: avoid;
          }
          
          .section {
            break-inside: avoid;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">
          <div class="logo-icon">RS</div>
          <div class="logo-text">RepSpheres Intelligence</div>
        </div>
        <div class="date">${new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</div>
      </div>
      
      <div class="report-header">
        <div class="doctor-info">
          <h1 class="doctor-name">${report.doctor}</h1>
          <div class="doctor-details">${report.specialty} • ${report.location}</div>
          <div class="doctor-details">Product Focus: ${report.product}</div>
        </div>
        <span class="score-badge">Intelligence Score: ${report.score}/100</span>
      </div>
      
      <div class="section">
        <h2 class="section-title">
          <span class="section-icon">💡</span>
          Key Insights
        </h2>
        <ul class="insights-list">
          ${report.insights.map(insight => `
            <li class="insight-item">${insight}</li>
          `).join('')}
        </ul>
      </div>
      
      <div class="section">
        <h2 class="section-title">
          <span class="section-icon">🎯</span>
          Recommended Next Steps
        </h2>
        <div class="next-steps">
          ${report.nextSteps.map(step => `
            <div class="step-chip">${step}</div>
          `).join('')}
        </div>
      </div>
      
      <div class="footer">
        <p>This report was generated by RepSpheres Intelligence</p>
        <p>Confidential - For Internal Use Only</p>
      </div>
    </body>
    </html>
  `;
  
  printWindow.document.write(html);
  printWindow.document.close();
  
  // Wait for content to load then trigger print
  printWindow.onload = () => {
    printWindow.print();
  };
  
  return printWindow;
};