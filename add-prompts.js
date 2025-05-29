// Script to add new prompts to Supabase database
// Run this with: node add-prompts.js

const SUPABASE_URL = 'https://cbopynuvhcymbumjnvay.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNib3B5bnV2aGN5bWJ1bWpudmF5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mzk5NTE3MywiZXhwIjoyMDU5NTcxMTczfQ.75TJbQHaB2wbDeXr3pCvmLxjoid51MhNmCl7jLeDcJE';

const newPrompts = [
  {
    prompt_name: "Pre-Call Intelligence - Dental Practice Analysis",
    prompt_content: `Generate a comprehensive pre-call intelligence report for {{doctor_name}} at {{practice_name}}.

Include the following sections:

1. **Provider Profile & Clinical Focus**
   - Specialty areas and procedures performed
   - Years in practice and educational background
   - Recent continuing education or certifications
   - Published research or professional speaking

2. **Practice Demographics & Patient Volume**
   - Patient demographics (age groups, insurance types)
   - Monthly patient volume and appointment patterns
   - Peak seasons and scheduling preferences
   - Office hours and availability windows

3. **Current Technology & Product Usage**
   - Existing dental equipment and technology stack
   - Product brands currently used (implants, materials, devices)
   - Recent equipment purchases or upgrades
   - Technology adoption patterns and preferences

4. **Practice Pain Points & Challenges**
   - Workflow bottlenecks and efficiency issues
   - Patient satisfaction concerns
   - Financial or operational challenges
   - Regulatory or compliance requirements

5. **Conversation Starters & Key Talking Points**
   - Relevant industry trends affecting their practice
   - Specific pain points our solutions address
   - Success stories from similar practices
   - Questions to uncover additional needs

Format this as a professional briefing document that a sales rep can quickly review before their appointment.`,
    report_type: "pre-call",
    target_audience: "Dental Sales Representatives",
    model_used: "gpt-4o",
    industry: "Healthcare - Dental",
    related_campaign: "Pre-Call Intelligence",
    usage_count: 0,
    effectiveness_score: 0,
    tags: ["dental", "pre-call", "intelligence", "practice-analysis"],
    active: true,
    input_type: "doctor_and_practice_info"
  },
  {
    prompt_name: "Pre-Call Intelligence - Aesthetic Practice Analysis", 
    prompt_content: `Generate a comprehensive pre-call intelligence report for {{doctor_name}} at {{practice_name}}.

Include the following sections:

1. **Provider Profile & Aesthetic Specialization**
   - Board certifications and aesthetic training
   - Signature procedures and treatment specialties
   - Years in aesthetic medicine
   - Professional associations and continuing education

2. **Patient Demographics & Volume Patterns**
   - Target patient demographics and psychographics
   - Monthly procedure volumes by treatment type
   - Seasonal trends and peak booking periods
   - Patient retention and referral patterns

3. **Current Product Portfolio & Technology**
   - Injectable products currently used (fillers, toxins)
   - Energy-based devices and laser equipment
   - Skincare product lines and protocols
   - Recent technology investments or upgrades

4. **Practice Positioning & Competition**
   - Market positioning and price points
   - Competitive landscape in their area
   - Marketing strategies and social media presence
   - Unique selling propositions

5. **Strategic Conversation Starters**
   - Emerging aesthetic trends and patient demands
   - Opportunities for treatment expansion
   - Efficiency and profit margin improvements
   - Training and certification opportunities

Format this as a strategic briefing that enables consultative selling focused on practice growth and patient outcomes.`,
    report_type: "pre-call",
    target_audience: "Aesthetic Sales Representatives", 
    model_used: "gpt-4o",
    industry: "Healthcare - Aesthetics",
    related_campaign: "Pre-Call Intelligence",
    usage_count: 0,
    effectiveness_score: 0,
    tags: ["aesthetics", "pre-call", "intelligence", "practice-analysis"],
    active: true,
    input_type: "doctor_and_practice_info"
  },
  {
    prompt_name: "Territory Expansion - Multi-Location Opportunity Analysis",
    prompt_content: `Analyze territory expansion opportunities for {{practice_name}} and similar practices in the {{geographic_area}} region.

Provide a comprehensive analysis including:

1. **Multi-Location Practice Opportunities**
   - Identify practices with multiple locations
   - Expansion plans and growth trajectories
   - Decision-making hierarchy and procurement processes
   - Standardization opportunities across locations

2. **Referral Network Mapping**
   - Key referral sources and relationships
   - Specialist networks and collaboration patterns
   - Hospital affiliations and group practice memberships
   - Professional relationships and partnerships

3. **Market Penetration Analysis**
   - Current market share vs. potential
   - Competitor product penetration
   - Untapped segments and growth opportunities
   - Geographic expansion possibilities

4. **Cross-Selling Strategic Plan**
   - Complementary product opportunities
   - Bundle and package potential
   - Upselling from current product usage
   - Integration with existing workflows

5. **Implementation Roadmap**
   - Priority account targeting sequence
   - Resource allocation recommendations
   - Timeline for territory development
   - Success metrics and tracking methods

Focus on actionable insights that drive revenue growth and market share expansion.`,
    report_type: "territory",
    target_audience: "Sales Representatives",
    model_used: "gpt-4o", 
    industry: "Healthcare - General",
    related_campaign: "Territory Development",
    usage_count: 0,
    effectiveness_score: 0,
    tags: ["territory", "expansion", "multi-location", "growth"],
    active: true,
    input_type: "practice_and_territory_info"
  },
  {
    prompt_name: "Implementation & Success - Training & Adoption Tracking",
    prompt_content: `Create a comprehensive implementation and success tracking plan for {{product_name}} at {{practice_name}}.

Structure the report with these key sections:

1. **Training Needs Assessment & Scheduling**
   - Staff skill levels and training requirements
   - Optimal training schedule and format preferences
   - Key personnel to include in training sessions
   - Ongoing education and support needs
   - Certification requirements and timelines

2. **Product Adoption Tracking & Milestones**
   - Implementation timeline and key milestones
   - Usage metrics and adoption benchmarks
   - Staff feedback and comfort level assessments
   - Integration with existing practice workflows
   - Early success indicators and warning signs

3. **ROI Metrics & Financial Performance**
   - Revenue impact and profit margin analysis
   - Cost savings and efficiency improvements
   - Patient volume and satisfaction improvements
   - Return on investment calculations
   - Comparative performance vs. baseline

4. **Reorder Patterns & Inventory Management**
   - Optimal inventory levels and reorder points
   - Usage patterns and consumption forecasting
   - Supply chain optimization opportunities
   - Bulk purchasing and volume discount strategies
   - Emergency stock and backup planning

5. **Success Stories & Testimonial Development**
   - Patient outcome improvements and case studies
   - Staff testimonials and efficiency gains
   - Before/after comparisons and metrics
   - Video testimonial and marketing opportunities
   - Referral program and advocacy development

Include specific action items, timelines, and success metrics for each area.`,
    report_type: "implementation",
    target_audience: "Sales Representatives",
    model_used: "gpt-4o",
    industry: "Healthcare - General", 
    related_campaign: "Customer Success",
    usage_count: 0,
    effectiveness_score: 0,
    tags: ["implementation", "training", "adoption", "roi", "success"],
    active: true,
    input_type: "product_and_practice_info"
  }
];

async function addPrompts() {
  try {
    console.log('Adding new prompts to Supabase...');
    
    for (const prompt of newPrompts) {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/ai_prompts`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          ...prompt,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
      });
      
      if (!response.ok) {
        const error = await response.text();
        console.error(`Error adding prompt "${prompt.prompt_name}":`, error);
      } else {
        const result = await response.json();
        console.log(`✓ Added prompt: ${prompt.prompt_name}`);
      }
    }
    
    console.log('All prompts added successfully!');
  } catch (error) {
    console.error('Error adding prompts:', error);
  }
}

addPrompts();